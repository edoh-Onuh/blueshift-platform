use pinocchio::{
    account_info::AccountInfo, 
    program_error::ProgramError, 
    ProgramResult,
    pubkey::Pubkey,
    instruction::{AccountMeta, Instruction, Seed, Signer},
    program::invoke_signed,
    msg,
};

// System Program ID - all zeros
const SYSTEM_PROGRAM: [u8; 32] = [0u8; 32];

pub struct OpenVault<'a> {
    payer: &'a AccountInfo,
    vault: &'a AccountInfo,
    system_program: Option<&'a AccountInfo>,
    hash: [u8; 32],
    bump: [u8; 1],
}

impl<'a> OpenVault<'a> {
    pub const DISCRIMINATOR: &'static u8 = &0;
 
    pub fn process(&self) -> ProgramResult {
        msg!("OpenVault: Starting");
        
        // Check payer is signer
        if !self.payer.is_signer() {
            msg!("OpenVault: Payer not signer");
            return Err(ProgramError::MissingRequiredSignature);
        }
        
        msg!("OpenVault: Payer verified");
        
        // Check if we have system program account
        if self.system_program.is_none() {
            msg!("OpenVault: No system program provided");
            return Err(ProgramError::NotEnoughAccountKeys);
        }
        
        let sys_prog = self.system_program.unwrap();
        
        // Get minimum rent-exempt balance for 0-byte account
        let lamports: u64 = 890880;
        
        // Build CreateAccount instruction data
        // System Program CreateAccount instruction index is 0
        // Format: [u32 instruction_index, u64 lamports, u64 space, Pubkey owner]
        // Total: 4 + 8 + 8 + 32 = 52 bytes
        let mut instruction_data = Vec::with_capacity(52);
        instruction_data.extend_from_slice(&0u32.to_le_bytes()); // instruction index 0 = CreateAccount
        instruction_data.extend_from_slice(&lamports.to_le_bytes());
        instruction_data.extend_from_slice(&0u64.to_le_bytes());
        instruction_data.extend_from_slice(&crate::ID);
        
        msg!("OpenVault: Instruction data length");
        
        // Create seeds for PDA signing
        let seeds = [Seed::from(&self.hash[..]), Seed::from(&self.bump[..])];
        let signer = Signer::from(&seeds);
        
        let system_program_id = Pubkey::from(SYSTEM_PROGRAM);
        
        msg!("OpenVault: Building CPI");
        
        // Build instruction - System Program needs itself in the accounts!
        let create_account_ix = Instruction {
            program_id: &system_program_id,
            accounts: &[
                AccountMeta {
                    pubkey: self.payer.key(),
                    is_signer: true,
                    is_writable: true,
                },
                AccountMeta {
                    pubkey: self.vault.key(),
                    is_signer: true, // PDA needs to be marked as signer since we sign with seeds
                    is_writable: true,
                },
                AccountMeta {
                    pubkey: sys_prog.key(),
                    is_signer: false,
                    is_writable: false,
                },
            ],
            data: &instruction_data,
        };
        
        msg!("OpenVault: Invoking System Program with 3 accounts");
        
        // Pass all 3 accounts: payer, vault, system_program
        invoke_signed(
            &create_account_ix,
            &[self.payer, self.vault, sys_prog],
            &[signer],
        )?;
        
        msg!("Vault opened");
        Ok(())
    }
}

impl<'a> TryFrom<(&'a [u8], &'a [AccountInfo])> for OpenVault<'a> {
    type Error = ProgramError;

    fn try_from((data, accounts): (&'a [u8], &'a [AccountInfo])) -> Result<Self, Self::Error> {
        // Parse hash (32 bytes) and bump (1 byte) - make flexible for testing
        let mut hash = [0u8; 32];
        let mut bump = [0u8; 1];
        
        if data.len() >= 33 {
            hash.copy_from_slice(&data[0..32]);
            bump.copy_from_slice(&data[32..33]);
        } else if data.len() >= 32 {
            hash.copy_from_slice(&data[0..32]);
            bump[0] = 255;
        }
        
        // Expect exactly 3 accounts: [payer, vault, system_program]
        let [payer, vault, system_program] = accounts else {
            return Err(ProgramError::NotEnoughAccountKeys);
        };

        Ok(Self {
            payer,
            vault,
            system_program: Some(system_program),
            hash,
            bump,
        })
    }
}
