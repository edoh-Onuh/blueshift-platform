#[cfg(test)]
mod tests {
    use mollusk_svm::{result::Check, Mollusk};
    use solana_address::Address;
    use solana_instruction::Instruction;

    #[test]
    fn test_memo_hello_solana() {
        let program_id_keypair_bytes: [u8; 32] =
            std::fs::read("deploy/blueshift_assembly_memo-keypair.json")
                .unwrap()[..32]
                .try_into()
                .expect("slice with incorrect length");
        let program_id = Address::new_from_array(program_id_keypair_bytes);

        let memo = b"Hello, Solana!";
        let instruction = Instruction::new_with_bytes(
            program_id,
            memo,
            vec![],
        );

        let mollusk = Mollusk::new(&program_id, "deploy/blueshift_assembly_memo");

        let result = mollusk.process_and_validate_instruction(
            &instruction,
            &[],
            &[Check::success()],
        );
        assert!(!result.program_result.is_err());
    }

    #[test]
    fn test_memo_different_input() {
        let program_id_keypair_bytes: [u8; 32] =
            std::fs::read("deploy/blueshift_assembly_memo-keypair.json")
                .unwrap()[..32]
                .try_into()
                .expect("slice with incorrect length");
        let program_id = Address::new_from_array(program_id_keypair_bytes);

        let memo = b"Hello, Solana, but different!";
        let instruction = Instruction::new_with_bytes(
            program_id,
            memo,
            vec![],
        );

        let mollusk = Mollusk::new(&program_id, "deploy/blueshift_assembly_memo");

        let result = mollusk.process_and_validate_instruction(
            &instruction,
            &[],
            &[Check::success()],
        );
        assert!(!result.program_result.is_err());
    }
}
