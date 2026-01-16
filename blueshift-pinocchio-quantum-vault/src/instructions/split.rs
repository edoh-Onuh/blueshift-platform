use pinocchio::{
    account_info::AccountInfo, msg, program_error::ProgramError, ProgramResult,
};

const VAULT_SEED: &[u8] = b"vault";

pub struct SplitVault<'a> {
    vault: &'a AccountInfo,
    payer: &'a AccountInfo,
    recipient: &'a AccountInfo,
    system_program: &'a AccountInfo,
    amount: u64,
    signature: [u8; 64],
    public_key: [u8; 1024],
}

impl<'a> SplitVault<'a> {
    pub const DISCRIMINATOR: &'static u8 = &1;

    pub fn process(&self) -> ProgramResult {
        // Verify vault has lamports (is initialized)
        if self.vault.lamports() == 0 {
            msg!("Vault not initialized");
            return Err(ProgramError::UninitializedAccount);
        }

        // Check vault has sufficient balance
        if self.vault.lamports() < self.amount {
            msg!("Insufficient vault balance");
            return Err(ProgramError::InsufficientFunds);
        }

        // Transfer lamports from vault to recipient
        unsafe {
            *self.vault.borrow_mut_lamports_unchecked() -= self.amount;
            *self.recipient.borrow_mut_lamports_unchecked() += self.amount;
        }

        msg!("Split lamports from vault");
        Ok(())
    }

    fn find_vault_bump(payer: &[u8; 32]) -> u8 {
        let program_id = &crate::ID;
        for bump in (0..=255).rev() {
            let seeds = &[VAULT_SEED, payer, &[bump]];
            if pinocchio::pubkey::create_program_address(seeds, program_id).is_ok() {
                return bump;
            }
        }
        panic!("Unable to find valid bump");
    }
}

impl<'a> TryFrom<(&'a [u8], &'a [AccountInfo])> for SplitVault<'a> {
    type Error = ProgramError;

    fn try_from(
        (data, accounts): (&'a [u8], &'a [AccountInfo]),
    ) -> Result<Self, Self::Error> {
        // Deserialize instruction data: amount (8 bytes) + signature (64 bytes) + public_key (variable)
        let amount = if data.len() >= 8 {
            u64::from_le_bytes(data[0..8].try_into().unwrap())
        } else {
            0
        };
        
        let mut signature = [0u8; 64];
        if data.len() > 8 {
            let sig_len = (data.len() - 8).min(64);
            signature[..sig_len].copy_from_slice(&data[8..8+sig_len]);
        }
        
        let mut public_key = [0u8; 1024];
        if data.len() > 72 {
            let pk_len = (data.len() - 72).min(1024);
            public_key[..pk_len].copy_from_slice(&data[72..72+pk_len]);
        }

        // Parse accounts
        let [vault, payer, recipient, system_program] = accounts else {
            return Err(ProgramError::NotEnoughAccountKeys);
        };

        Ok(Self {
            vault,
            payer,
            recipient,
            system_program,
            amount,
            signature,
            public_key,
        })
    }
}
