use anchor_lang::prelude::*;

mod state;
mod errors;
mod instructions;

use instructions::*;

declare_id!("22222222222222222222222222222222222222222222");

#[program]
pub mod blueshift_anchor_escrow {
    use super::*;

    #[instruction(discriminator = 0)]
    pub fn make(ctx: Context<Make>, seed: u64, receive: u64, amount: u64) -> Result<()> {
        ctx.accounts.save_escrow(seed, receive, &ctx.bumps)?;
        ctx.accounts.deposit_to_vault(amount)
    }

    #[instruction(discriminator = 1)]
    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.transfer_to_maker()?;
        ctx.accounts.withdraw_and_close_vault()?;
        Ok(())
    }

    #[instruction(discriminator = 2)]
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.withdraw_and_close_vault()?;
        Ok(())
    }
}
