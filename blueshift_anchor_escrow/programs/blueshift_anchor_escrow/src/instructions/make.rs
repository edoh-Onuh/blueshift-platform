use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::{errors::EscrowError, state::Escrow};

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct Make<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    
    #[account(
        init,
        payer = maker,
        space = 8 + Escrow::INIT_SPACE,
        seeds = [b"escrow", maker.key().as_ref(), &seed.to_le_bytes()],
        bump
    )]
    pub escrow: Account<'info, Escrow>,
    
    /// CHECK: Mint account, validated by token program
    pub mint_a: UncheckedAccount<'info>,
    
    /// CHECK: Mint account, validated by token program
    pub mint_b: UncheckedAccount<'info>,
    
    /// CHECK: Token account, validated by token program CPI
    #[account(mut)]
    pub maker_ata_a: UncheckedAccount<'info>,
    
    #[account(
        init,
        payer = maker,
        associated_token::mint = mint_a,
        associated_token::authority = escrow
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    
    pub associated_token_program: Program<'info, AssociatedToken>,
    /// CHECK: Token program - can be either Token or Token-2022
    pub token_program: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> Make<'info> {
    pub fn save_escrow(&mut self, seed: u64, receive: u64, bumps: &MakeBumps) -> Result<()> {
        require!(receive > 0, EscrowError::InvalidAmount);
        
        self.escrow.set_inner(Escrow {
            seed,
            maker: self.maker.key(),
            mint_a: self.mint_a.key(),
            mint_b: self.mint_b.key(),
            receive,
            bump: bumps.escrow,
        });
        
        Ok(())
    }
    
    pub fn deposit_to_vault(&mut self, amount: u64) -> Result<()> {
        require!(amount > 0, EscrowError::InvalidAmount);
        
        let cpi_program = self.token_program.to_account_info();
        
        let cpi_accounts = anchor_spl::token_interface::TransferChecked {
            from: self.maker_ata_a.to_account_info(),
            mint: self.mint_a.to_account_info(),
            to: self.vault.to_account_info(),
            authority: self.maker.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        // Get decimals from mint account data (at offset 44 for Token program)
        let mint_data = self.mint_a.try_borrow_data()?;
        let decimals = mint_data.get(44).copied().unwrap_or(9);
        
        transfer_checked(cpi_ctx, amount, decimals)
    }
}
