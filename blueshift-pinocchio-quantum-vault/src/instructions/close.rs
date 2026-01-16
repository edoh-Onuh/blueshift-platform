use pinocchio::{
    account_info::AccountInfo, msg, program_error::ProgramError, ProgramResult,
};

const VAULT_SEED: &[u8] = b"vault";

pub struct CloseVault<'a> {
    vault: &'a AccountInfo,
    payer: &'a AccountInfo,
    signature: [u8; 64],
    public_key: [u8; 1024],
}

impl<'a> CloseVault<'a> {
    pub const DISCRIMINATOR: &'static u8 = &2;

    pub fn process(&self) -> ProgramResult {
        // Verify vault has lamports (is initialized)
        if self.vault.lamports() == 0 {
            msg!("Vault not initialized");
            return Err(ProgramError::UninitializedAccount);
        }

        // Transfer all lamports from vault to payer
        let vault_lamports = self.vault.lamports();
        unsafe {
            *self.vault.borrow_mut_lamports_unchecked() = 0;
            *self.payer.borrow_mut_lamports_unchecked() += vault_lamports;
        }

        msg!("Vault closed");
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

impl<'a> TryFrom<(&'a [u8], &'a [AccountInfo])> for CloseVault<'a> {
    type Error = ProgramError;

    fn try_from(
        (data, accounts): (&'a [u8], &'a [AccountInfo]),
    ) -> Result<Self, Self::Error> {
        // Deserialize instruction data: signature (64 bytes) + public_key (variable)
        let mut signature = [0u8; 64];
        let sig_len = data.len().min(64);
        if sig_len > 0 {
            signature[..sig_len].copy_from_slice(&data[..sig_len]);
        }
        
        let mut public_key = [0u8; 1024];
        if data.len() > 64 {
            let pk_len = (data.len() - 64).min(1024);
            public_key[..pk_len].copy_from_slice(&data[64..64+pk_len]);
        }

        // Parse accounts
        let [vault, payer] = accounts else {
            return Err(ProgramError::NotEnoughAccountKeys);
        };

        Ok(Self {
            vault,
            payer,
            signature,
            public_key,
        })
    }
}
