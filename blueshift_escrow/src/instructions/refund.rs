use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    pubkey::Pubkey,
    entrypoint::ProgramResult,
};
use pinocchio::cpi::{Seed, Signer};
use pinocchio_token::instructions::{Transfer, CloseAccount};
use crate::state::Escrow;
use crate::instructions::helpers::*;

pub struct RefundAccounts<'a> {
    pub maker: &'a AccountInfo,
    pub escrow: &'a AccountInfo,
    pub mint_a: &'a AccountInfo,
    pub vault: &'a AccountInfo,
    pub maker_ata_a: &'a AccountInfo,
    pub system_program: &'a AccountInfo,
    pub token_program: &'a AccountInfo,
}

impl<'a> TryFrom<&'a [AccountInfo]> for RefundAccounts<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        if accounts.len() < 7 {
            return Err(ProgramError::NotEnoughAccountKeys);
        }

        let maker = &accounts[0];
        let escrow = &accounts[1];
        let mint_a = &accounts[2];
        let vault = &accounts[3];
        let maker_ata_a = &accounts[4];
        let system_program = &accounts[5];
        let token_program = &accounts[6];

        // Basic Accounts Checks
        SignerAccount::check(maker)?;
        ProgramAccount::check(escrow)?;
        MintInterface::check(mint_a)?;
        AssociatedTokenAccount::check(vault, escrow, mint_a, token_program)?;
        AssociatedTokenAccount::check(maker_ata_a, maker, mint_a, token_program)?;

        Ok(Self {
            maker,
            escrow,
            mint_a,
            vault,
            maker_ata_a,
            system_program,
            token_program,
        })
    }
}

pub struct Refund<'a> {
    pub accounts: RefundAccounts<'a>,
}

impl<'a> TryFrom<&'a [AccountInfo]> for Refund<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        let accounts = RefundAccounts::try_from(accounts)?;

        Ok(Self {
            accounts,
        })
    }
}

impl<'a> Refund<'a> {
    pub const DISCRIMINATOR: &'a u8 = &2;

    pub fn process(&mut self) -> ProgramResult {
        let data = self.accounts.escrow.try_borrow_data()?;
        let escrow = Escrow::load(&data)?;

        // Check if the escrow is valid
        let escrow_key = Pubkey::create_program_address(
            &[b"escrow", self.accounts.maker.key().as_ref(), &escrow.seed.to_le_bytes(), &escrow.bump],
            &crate::ID
        )?;

        if &escrow_key != self.accounts.escrow.key() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        // Verify the maker matches
        if &escrow.maker != self.accounts.maker.key() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        let seed_binding = escrow.seed.to_le_bytes();
        let bump_binding = escrow.bump;
        let escrow_seeds = [
            Seed::from(b"escrow"),
            Seed::from(self.accounts.maker.key().as_ref()),
            Seed::from(&seed_binding),
            Seed::from(&bump_binding),
        ];
        let signer = Signer::from(&escrow_seeds);

        let amount = TokenAccount::from_account_info(self.accounts.vault)?.amount()?;

        // Transfer from the Vault back to the Maker
        Transfer {
            from: self.accounts.vault,
            to: self.accounts.maker_ata_a,
            authority: self.accounts.escrow,
            amount,
        }.invoke_signed(&[signer.clone()])?;

        // Close the Vault
        CloseAccount {
            account: self.accounts.vault,
            destination: self.accounts.maker,
            authority: self.accounts.escrow,
        }.invoke_signed(&[signer.clone()])?;

        // Close the Escrow
        drop(data);
        ProgramAccount::close(self.accounts.escrow, self.accounts.maker)?;

        Ok(())
    }
}
