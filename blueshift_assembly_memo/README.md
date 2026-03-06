# Assembly Memo - Blueshift Challenge

sBPF Assembly memo program for the Superteam UK Intermediate Developer Challenge.

## Overview

A minimal sBPF assembly program that logs instruction data to the Solana validator log using the `sol_log_` syscall.

## How It Works

1. Loads the number of accounts into `r0` — if any accounts are passed, the program fails on exit (non-zero `r0`)
2. Loads the instruction data length into `r2`
3. Adjusts `r1` to point to the instruction data bytes
4. Calls `sol_log_` (syscall helper ID 16) to print the memo
5. Exits with `r0` (0 = success, non-zero = failure)

## Build

```bash
sbpf build
```

This generates a `.so` file in `target/deploy/`.

## Challenge Tests

- **Challenge 1**: Logs `Hello, Solana!`
- **Challenge 2**: Logs `Hello, Solana, but different!`
