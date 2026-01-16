#![no_std]

use pinocchio::{entrypoint, nostd_panic_handler, ProgramResult, AccountView};
use pinocchio::error::ProgramError;
use pinocchio::address::Address as Pubkey;

entrypoint!(process_instruction);
nostd_panic_handler!();

pub mod instructions;
pub use instructions::*;

// 22222222222222222222222222222222222222222222
pub const ID: Pubkey = Pubkey::from_str_const("22222222222222222222222222222222222222222222");

fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountView],
    instruction_data: &[u8],
) -> ProgramResult {
    match instruction_data.split_first() {
        Some((Deposit::DISCRIMINATOR, data)) => Deposit::try_from((data, accounts))?.process(),
        Some((Withdraw::DISCRIMINATOR, _)) => Withdraw::try_from(accounts)?.process(),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}

