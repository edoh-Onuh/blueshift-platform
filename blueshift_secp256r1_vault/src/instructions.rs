use core::mem::size_of;
use pinocchio::account_info::AccountInfo;
use pinocchio::program_error::ProgramError;
use pinocchio::pubkey::find_program_address;
use pinocchio::ProgramResult;
use pinocchio::instruction::{Seed, Signer, Instruction, AccountMeta};
use pinocchio_secp256r1_instruction::{Secp256r1Instruction, Secp256r1Pubkey};
use pinocchio::sysvars::instructions::{Instructions, INSTRUCTIONS_ID};
use pinocchio::sysvars::Sysvar;

// System Program ID
pub const SYSTEM_PROGRAM_ID: [u8; 32] = [0; 32];

// System Program Transfer instruction discriminator
const SYSTEM_TRANSFER: u32 = 2;

// ============================================================================
// Deposit Instruction
// ============================================================================

pub struct DepositAccounts<'a> {
    pub payer: &'a AccountInfo,
    pub vault: &'a AccountInfo,
}

impl<'a> TryFrom<&'a [AccountInfo]> for DepositAccounts<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        if accounts.len() < 2 {
            return Err(ProgramError::NotEnoughAccountKeys);
        }
        let payer = &accounts[0];
        let vault = &accounts[1];

        // Accounts Checks
        if !payer.is_signer() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if !vault.is_owned_by(&SYSTEM_PROGRAM_ID) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if vault.lamports().ne(&0) {
            return Err(ProgramError::InvalidAccountData);
        }

        // Return the accounts
        Ok(Self { payer, vault })
    }
}

#[repr(C, packed)]
pub struct DepositInstructionData {
    pub pubkey: Secp256r1Pubkey,
    pub amount: u64,
}

impl<'a> TryFrom<&'a [u8]> for DepositInstructionData {
    type Error = ProgramError;

    fn try_from(data: &'a [u8]) -> Result<Self, Self::Error> {
        if data.len() != size_of::<Self>() {
            return Err(ProgramError::InvalidInstructionData);
        }

        let (pubkey_bytes, amount_bytes) = data.split_at(size_of::<Secp256r1Pubkey>());
        Ok(Self {
            pubkey: pubkey_bytes.try_into().unwrap(),
            amount: u64::from_le_bytes(amount_bytes.try_into().unwrap()),
        })
    }
}

pub struct Deposit<'a> {
    pub accounts: DepositAccounts<'a>,
    pub instruction_data: DepositInstructionData,
}

impl<'a> TryFrom<(&'a [u8], &'a [AccountInfo])> for Deposit<'a> {
    type Error = ProgramError;

    fn try_from((data, accounts): (&'a [u8], &'a [AccountInfo])) -> Result<Self, Self::Error> {
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
        // Check vault address
        let (vault_key, _) = find_program_address(
            &[
                b"vault",
                &self.instruction_data.pubkey[..1],
                &self.instruction_data.pubkey[1..33]
            ],
            &crate::ID
        );
        if vault_key.ne(self.accounts.vault.key()) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        // CPI to system program to transfer lamports
        let instruction_data = [
            &SYSTEM_TRANSFER.to_le_bytes()[..],
            &self.instruction_data.amount.to_le_bytes()[..]
        ].concat();

        let instruction = Instruction {
            program_id: &SYSTEM_PROGRAM_ID,
            accounts: &[
                AccountMeta::writable_signer(self.accounts.payer.key()),
                AccountMeta::writable(self.accounts.vault.key()),
            ],
            data: &instruction_data,
        };

        pinocchio::program::invoke(&instruction, &[self.accounts.payer, self.accounts.vault])?;

        Ok(())
    }
}

// ============================================================================
// Withdraw Instruction
// ============================================================================

pub struct WithdrawAccounts<'a> {
    pub payer: &'a AccountInfo,
    pub vault: &'a AccountInfo,
    pub instructions: &'a AccountInfo,
}

impl<'a> TryFrom<&'a [AccountInfo]> for WithdrawAccounts<'a> {
    type Error = ProgramError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        if accounts.len() < 3 {
            return Err(ProgramError::NotEnoughAccountKeys);
        }
        let payer = &accounts[0];
        let vault = &accounts[1];
        let instructions = &accounts[2];

        if !payer.is_signer() {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if !vault.is_owned_by(&SYSTEM_PROGRAM_ID) {
            return Err(ProgramError::InvalidAccountOwner);
        }

        if vault.lamports() == 0 {
            return Err(ProgramError::InvalidAccountData);
        }

        // Verify instructions sysvar
        if instructions.key() != &INSTRUCTIONS_ID {
            return Err(ProgramError::InvalidAccountData);
        }

        Ok(Self { payer, vault, instructions })
    }
}

pub struct WithdrawInstructionData {
    pub bump: [u8; 1]
}

impl<'a> TryFrom<&'a [u8]> for WithdrawInstructionData {
    type Error = ProgramError;

    fn try_from(data: &'a [u8]) -> Result<Self, Self::Error> {
        Ok(Self {
            bump: [*data.first().ok_or(ProgramError::InvalidInstructionData)?],
        })
    }
}

pub struct Withdraw<'a> {
    pub accounts: WithdrawAccounts<'a>,
    pub instruction_data: WithdrawInstructionData,
}

impl<'a> TryFrom<(&'a [u8], &'a [AccountInfo])> for Withdraw<'a> {
    type Error = ProgramError;

    fn try_from((data, accounts): (&'a [u8], &'a [AccountInfo])) -> Result<Self, Self::Error> {
        let accounts = WithdrawAccounts::try_from(accounts)?;
        let instruction_data = WithdrawInstructionData::try_from(data)?;
        Ok(Self {
            accounts,
            instruction_data,
        })
    }
}

impl<'a> Withdraw<'a> {
    pub const DISCRIMINATOR: &'a u8 = &1;

    pub fn process(&mut self) -> ProgramResult {
        // Load instructions sysvar using TryFrom
        let instructions = Instructions::try_from(self.accounts.instructions)?;
        
        // Get instruction directly after this one
        let ix = instructions.get_instruction_relative(1)?;
        
        // Get the instruction data using the safe method
        let instruction_data = ix.get_instruction_data();
        
        // Get Secp256r1 instruction
        let secp256r1_ix = Secp256r1Instruction::try_from(instruction_data)?;
        
        // Enforce that we only have one signature
        if secp256r1_ix.num_signatures() != 1 {
            return Err(ProgramError::InvalidInstructionData);
        }
        
        // Enforce that the signer of the first signature is our PDA owner
        let signer: Secp256r1Pubkey = *secp256r1_ix.get_signer(0)?;
        
        // Check that our fee payer is the correct 
        let (payer, expiry) = secp256r1_ix
            .get_message_data(0)?
            .split_at(32);
        
        if self.accounts.payer.key().ne(payer) {
            return Err(ProgramError::InvalidAccountOwner);
        }
        
        // Get current timestamp
        let now = pinocchio::sysvars::clock::Clock::get()?.unix_timestamp;
        
        // Get signature expiry timestamp
        let expiry = i64::from_le_bytes(
            expiry
                .try_into()
                .map_err(|_| ProgramError::InvalidInstructionData)?
        );
        
        if now > expiry {
            return Err(ProgramError::InvalidInstructionData);
        }
        
        // Create signer seeds for our CPI
        let seeds = [
            Seed::from(b"vault"),
            Seed::from(&signer[..1]),
            Seed::from(&signer[1..]),
            Seed::from(&self.instruction_data.bump),
        ];
        let signer_ref = Signer::from(&seeds);

        // CPI to system program to transfer all lamports from vault to payer with PDA signing
        let lamports = self.accounts.vault.lamports();
        let instruction_data = [
            &SYSTEM_TRANSFER.to_le_bytes()[..],
            &lamports.to_le_bytes()[..]
        ].concat();

        let instruction = Instruction {
            program_id: &SYSTEM_PROGRAM_ID,
            accounts: &[
                AccountMeta::writable_signer(self.accounts.vault.key()),
                AccountMeta::writable(self.accounts.payer.key()),
            ],
            data: &instruction_data,
        };

        pinocchio::program::invoke_signed(&instruction, &[self.accounts.vault, self.accounts.payer], &[signer_ref])?;

        Ok(())
    }
}
