use core::mem::size_of;
use pinocchio::AccountView;
use pinocchio::error::ProgramError;
use pinocchio::address::Address as Pubkey;
use pinocchio::ProgramResult;
use pinocchio::cpi::{Seed, Signer};
use pinocchio_system::instructions::Transfer;

// ============================================================================
// Deposit Instruction
// ============================================================================

pub struct DepositAccounts<'a> {
    pub owner: &'a AccountView,
    pub vault: &'a AccountView,
}

impl<'a> TryFrom<&'a [AccountView]> for DepositAccounts<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountView]) -> Result<Self, Self::Error> {
        let [owner, vault, _] = accounts else {
            return Err(ProgramError::NotEnoughAccountKeys);
        };

        // Accounts Checks
        if !owner.is_signer() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if !vault.owned_by(&pinocchio_system::ID) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if vault.lamports().ne(&0) {
            return Err(ProgramError::InvalidAccountData);
        }

        let (vault_key, _) = Pubkey::find_program_address(&[b"vault", owner.address().as_ref()], &crate::ID);
        if vault.address().ne(&vault_key) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        // Return the accounts
        Ok(Self { owner, vault })
    }
}

pub struct DepositInstructionData {
    pub amount: u64,
}

impl<'a> TryFrom<&'a [u8]> for DepositInstructionData {
    type Error = ProgramError;

    fn try_from(data: &'a [u8]) -> Result<Self, Self::Error> {
        if data.len() != size_of::<u64>() {
            return Err(ProgramError::InvalidInstructionData);
        }

        let amount = u64::from_le_bytes(data.try_into().unwrap());

        // Instruction Checks
        if amount.eq(&0) {
            return Err(ProgramError::InvalidInstructionData);
        }

        Ok(Self { amount })
    }
}

pub struct Deposit<'a> {
    pub accounts: DepositAccounts<'a>,
    pub instruction_data: DepositInstructionData,
}

impl<'a> TryFrom<(&'a [u8], &'a [AccountView])> for Deposit<'a> {
    type Error = ProgramError;

    fn try_from((data, accounts): (&'a [u8], &'a [AccountView])) -> Result<Self, Self::Error> {
        let accounts = DepositAccounts::try_from(accounts)?;
        let instruction_data = DepositInstructionData::try_from(data)?;
        Ok(Self {
            accounts,
            instruction_data,
        })
    }
}

impl<'a> Deposit<'a> {
    pub const DISCRIMINATOR: &'a u8 = &0;

    pub fn process(&mut self) -> ProgramResult {
        Transfer {
            from: self.accounts.owner,
            to: self.accounts.vault,
            lamports: self.instruction_data.amount,
        }
        .invoke()?;

        Ok(())
    }
}

// ============================================================================
// Withdraw Instruction
// ============================================================================

pub struct WithdrawAccounts<'a> {
    pub owner: &'a AccountView,
    pub vault: &'a AccountView,
    pub bumps: [u8; 1],
}

impl<'a> TryFrom<&'a [AccountView]> for WithdrawAccounts<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountView]) -> Result<Self, Self::Error> {
        let [owner, vault, _] = accounts else {
            return Err(ProgramError::NotEnoughAccountKeys);
        };

        // Basic Accounts Checks
        if !owner.is_signer() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if !vault.owned_by(&pinocchio_system::ID) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if vault.lamports().eq(&0) {
            return Err(ProgramError::InvalidAccountData);
        }

        let (vault_key, bump) = Pubkey::find_program_address(&[b"vault", owner.address().as_ref()], &crate::ID);
        if &vault_key != vault.address() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        Ok(Self {
            owner,
            vault,
            bumps: [bump],
        })
    }
}

pub struct Withdraw<'a> {
    pub accounts: WithdrawAccounts<'a>,
}

impl<'a> TryFrom<&'a [AccountView]> for Withdraw<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountView]) -> Result<Self, Self::Error> {
        let accounts = WithdrawAccounts::try_from(accounts)?;
        Ok(Self { accounts })
    }
}

impl<'a> Withdraw<'a> {
    pub const DISCRIMINATOR: &'a u8 = &1;

    pub fn process(&mut self) -> ProgramResult {
        // Create PDA signer seeds
        let seeds = [
            Seed::from(b"vault"),
            Seed::from(self.accounts.owner.address().as_ref()),
            Seed::from(&self.accounts.bumps),
        ];
        let signers = [Signer::from(&seeds)];

        // Transfer all lamports from vault to owner
        Transfer {
            from: self.accounts.vault,
            to: self.accounts.owner,
            lamports: self.accounts.vault.lamports(),
        }
        .invoke_signed(&signers)?;

        Ok(())
    }
}
