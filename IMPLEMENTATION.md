# Anchor Vault Challenge - Complete Implementation

## Complete Code for lib.rs

Replace the contents of `programs/blueshift_anchor_vault/src/lib.rs` with this code:

```rust
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

declare_id!("22222222222222222222222222222222222222222222");

#[program]
pub mod blueshift_anchor_vault {
    use super::*;

    pub fn deposit(ctx: Context<VaultAction>, amount: u64) -> Result<'_> {
        // Check if vault is empty (prevent double deposits)
        require_eq!(
            ctx.accounts.vault.lamports(),
            0,
            VaultError::VaultAlreadyExists
        );

        // Ensure amount exceeds rent-exempt minimum
        require_gt!(
            amount,
            Rent::get()?.minimum_balance(0),
            VaultError::InvalidAmount
        );

        // Transfer lamports from signer to vault
        transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                },
            ),
            amount,
        )?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<VaultAction>) -> Result<'_> {
        // Check if vault has any lamports
        require_neq!(
            ctx.accounts.vault.lamports(),
            0,
            VaultError::InvalidAmount
        );

        // Create PDA signer seeds
        let signer_key = ctx.accounts.signer.key();
        let signer_seeds = &[b"vault", signer_key.as_ref(), &[ctx.bumps.vault]];

        // Transfer all lamports from vault to signer
        transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.signer.to_account_info(),
                },
                &[&signer_seeds[..]],
            ),
            ctx.accounts.vault.lamports(),
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct VaultAction<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"vault", signer.key().as_ref()],
        bump,
    )]
    pub vault: SystemAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum VaultError {
    #[msg("Vault already exists")]
    VaultAlreadyExists,
    
    #[msg("Invalid amount")]
    InvalidAmount,
}
```

## Code Explanation

### Program Structure

1. **Program ID**: Set to `22222222222222222222222222222222222222222222` as required by Blueshift
2. **Two Instructions**: 
   - `deposit`: Stores lamports in the vault
   - `withdraw`: Retrieves all lamports from the vault

### Accounts Structure (`VaultAction`)

- **signer**: The user who owns the vault (marked as `mut` because their balance changes)
- **vault**: A PDA (Program Derived Address) that stores the lamports
  - Derived from seeds: `[b"vault", signer.key().as_ref()]`
  - Each user has their own unique vault
- **system_program**: Required for transferring lamports

### Deposit Logic

1. **Check vault is empty**: Prevents depositing into an already-filled vault
2. **Validate amount**: Must exceed rent-exempt minimum (prevents dust deposits)
3. **Transfer**: Move lamports from signer to vault using CPI

### Withdraw Logic

1. **Check vault has funds**: Ensures there's something to withdraw
2. **Create PDA signer**: The vault needs to sign the transaction
3. **Transfer**: Move all lamports back to the signer

### Error Handling

- `VaultAlreadyExists`: Vault already has lamports
- `InvalidAmount`: Invalid deposit/withdrawal amount

## Building the Program

```powershell
# Make sure you're in the project directory
cd blueshift_anchor_vault

# Build the program
anchor build

# The compiled program will be at:
# target/deploy/blueshift_anchor_vault.so
```

## Submitting to Blueshift

1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault
2. Click "Take Challenge"
3. Upload the file: `target/deploy/blueshift_anchor_vault.so`
4. If successful, you'll receive an NFT to your connected wallet!

## Testing Locally (Optional)

If you want to test before submitting:

```powershell
# Run tests
anchor test
```

## Important Notes

- The program ID MUST be `22222222222222222222222222222222222222222222`
- Build the program with `anchor build`, not `cargo build-bpf`
- Upload the `.so` file, not the `.json` or any other file
- Make sure your wallet is connected to Blueshift before taking the challenge
