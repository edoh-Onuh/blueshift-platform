# Anchor Vault Challenge - Complete Setup Guide

## Prerequisites Installation

### 1. Install Rust
Open PowerShell as Administrator and run:
```powershell
# Download and install Rust
Invoke-WebRequest -Uri "https://win.rustup.rs/x86_64" -OutFile "$env:TEMP\rustup-init.exe"
& "$env:TEMP\rustup-init.exe" -y

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify installation
rustc --version
cargo --version
```

### 2. Install Solana CLI
```powershell
# Download Solana installer
cmd /c "curl https://release.solana.com/stable/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs"

# Run installer
C:\solana-install-tmp\solana-install-init.exe v1.18.18

# Add Solana to PATH (add this to your PowerShell profile or run in current session)
$env:Path += ";C:\Users\$env:USERNAME\.local\share\solana\install\active_release\bin"

# Verify installation
solana --version
```

### 3. Install Anchor
```powershell
# Install Anchor using cargo
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Install latest Anchor version
avm install latest
avm use latest

# Verify installation
anchor --version
```

### 4. Set up Solana Wallet
```powershell
# Create a new keypair (if you don't have one)
solana-keygen new

# Set to devnet
solana config set --url devnet

# Airdrop some SOL for testing
solana airdrop 2
```

## Project Setup

After installing all prerequisites, run:

```powershell
cd c:\Users\adanu\OneDrive\edoh-supperteam-platform
anchor init blueshift_anchor_vault
cd blueshift_anchor_vault
```

## Next Steps

Once the project is initialized, you'll need to:
1. Update the program code in `programs/blueshift_anchor_vault/src/lib.rs`
2. Build the program: `anchor build`
3. Upload the `.so` file from `target/deploy` to Blueshift
4. Complete the challenge and receive your NFT!

See `IMPLEMENTATION.md` for the complete code implementation.
