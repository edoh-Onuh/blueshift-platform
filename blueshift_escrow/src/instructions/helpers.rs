use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    pubkey::Pubkey,
    entrypoint::ProgramResult,
};

/// Helper to check if an account is a signer
pub struct SignerAccount;

impl SignerAccount {
    pub fn check(account: &AccountInfo) -> ProgramResult {
        if !account.is_signer() {
            return Err(ProgramError::MissingRequiredSignature);
        }
        Ok(())
    }
}

/// Helper to check if an account is a valid mint
pub struct MintInterface;

impl MintInterface {
    pub fn check(account: &AccountInfo) -> ProgramResult {
        // Check if owned by token program
        let token_program_id = pinocchio_token::ID;
        if account.owner() != &token_program_id {
            return Err(ProgramError::InvalidAccountOwner);
        }
        Ok(())
    }
}

/// Helper to check and initialize associated token accounts
pub struct AssociatedTokenAccount;

impl AssociatedTokenAccount {
    pub fn check(
        ata: &AccountInfo,
        owner: &AccountInfo,
        mint: &AccountInfo,
        _token_program: &AccountInfo,
    ) -> ProgramResult {
        // Derive the expected ATA address
        let (expected_ata, _) = Pubkey::find_program_address(
            &[
                owner.key().as_ref(),
                pinocchio_token::ID.as_ref(),
                mint.key().as_ref(),
            ],
            &pinocchio_associated_token_account::ID,
        );
        
        if ata.key() != &expected_ata {
            return Err(ProgramError::InvalidAccountData);
        }
        Ok(())
    }

    pub fn init(
        ata: &AccountInfo,
        mint: &AccountInfo,
        payer: &AccountInfo,
        owner: &AccountInfo,
        system_program: &AccountInfo,
        token_program: &AccountInfo,
    ) -> ProgramResult {
        pinocchio_associated_token_account::instructions::Create {
            funding_account: payer,
            account: ata,
            wallet: owner,
            mint,
            system_program,
            token_program,
        }.invoke()
    }

    pub fn init_if_needed(
        ata: &AccountInfo,
        mint: &AccountInfo,
        payer: &AccountInfo,
        owner: &AccountInfo,
        system_program: &AccountInfo,
        token_program: &AccountInfo,
    ) -> ProgramResult {
        // Check if account already exists
        if ata.data_len() > 0 {
            return Ok(());
        }
        
        Self::init(ata, mint, payer, owner, system_program, token_program)
    }
}

/// Helper for program-owned accounts
pub struct ProgramAccount;

impl ProgramAccount {
    pub fn check(account: &AccountInfo) -> ProgramResult {
        if account.owner() != &crate::ID {
            return Err(ProgramError::InvalidAccountOwner);
        }
        Ok(())
    }

    pub fn init<T>(
        payer: &AccountInfo,
        account: &AccountInfo,
        seeds: &[pinocchio::cpi::Seed],
        space: usize,
    ) -> ProgramResult {
        use pinocchio::cpi::Signer;
        use pinocchio::sysvars::{rent::Rent, Sysvar};
        use pinocchio_system::instructions::CreateAccount;
        
        let lamports = Rent::get()?.try_minimum_balance(space)?;
        
        CreateAccount {
            from: payer,
            to: account,
            lamports,
            space: space as u64,
            owner: &crate::ID,
        }.invoke_signed(&[Signer::from(seeds)])
    }

    pub fn close(account: &AccountInfo, destination: &AccountInfo) -> ProgramResult {
        let dest_lamports = destination.lamports();
        let account_lamports = account.lamports();
        
        **destination.borrow_mut_lamports()? = dest_lamports.checked_add(account_lamports)
            .ok_or(ProgramError::ArithmeticOverflow)?;
        **account.borrow_mut_lamports()? = 0;
        
        Ok(())
    }
}

/// Token account helper
pub struct TokenAccount<'a> {
    account: &'a AccountInfo,
}

impl<'a> TokenAccount<'a> {
    pub fn from_account_info(account: &'a AccountInfo) -> Result<Self, ProgramError> {
        if account.data_len() != 165 {
            return Err(ProgramError::InvalidAccountData);
        }
        Ok(Self { account })
    }

    pub fn amount(&self) -> Result<u64, ProgramError> {
        // Token account amount is stored at offset 64-72 (u64 little-endian)
        let data = self.account.try_borrow_data()?;
        if data.len() < 72 {
            return Err(ProgramError::InvalidAccountData);
        }
        let amount_bytes: [u8; 8] = data[64..72].try_into()
            .map_err(|_| ProgramError::InvalidAccountData)?;
        Ok(u64::from_le_bytes(amount_bytes))
    }
}
