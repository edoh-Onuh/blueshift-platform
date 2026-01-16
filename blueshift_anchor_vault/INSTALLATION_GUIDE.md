# Manual Installation Steps for Anchor Vault Challenge

## ✅ Already Completed
- ✓ Rust is installed (version 1.91.1)
- ✓ Project structure created
- ✓ Source code implemented in lib.rs

## 📋 What You Need to Install

### Option 1: Quick Install (Recommended - Takes 15-20 minutes total)

Open a NEW PowerShell window and run these commands ONE AT A TIME:

```powershell
# 1. Add cargo to your PATH (if not already done)
$env:Path += ";$env:USERPROFILE\.cargo\bin"

# 2. Install Anchor CLI (THIS TAKES 15-20 MINUTES - BE PATIENT!)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked

# 3. After installation completes, verify it worked:
anchor --version

# 4. Build the project:
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build
```

### Option 2: Alternative Method (If Option 1 fails)

If the Anchor installation fails or takes too long, you can use cargo directly to build for Solana:

```powershell
# 1. Install Solana platform tools
cargo install solana-cli --version 1.18.26

# 2. Add Solana to PATH
$env:Path += ";$env:USERPROFILE\.local\share\solana\install\active_release\bin"

# 3. Install cargo-build-sbf
cargo install cargo-build-sbf --version 1.18.26

# 4. Build using cargo-build-sbf
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\programs\blueshift_anchor_vault"
cargo build-sbf
```

## ⚠️ Important Notes

1. **Installation Takes Time**: The Anchor CLI installation compiles many dependencies and can take 15-20 minutes. Don't interrupt it!

2. **New Terminal Window**: Close VS Code terminal and open a fresh PowerShell window to ensure environment variables are loaded correctly.

3. **Internet Connection**: Make sure you have a stable internet connection throughout the installation.

4. **Disk Space**: Ensure you have at least 5GB of free disk space for all the dependencies.

## 🏃‍♂️ Quick Test

After installation, test if Anchor is working:

```powershell
# Check if anchor is installed
anchor --version

# Should output something like: anchor-cli 0.30.1
```

## 🔧 Troubleshooting

### "anchor not found" error
```powershell
# Manually add cargo bin to PATH
$env:Path += ";$env:USERPROFILE\.cargo\bin"

# Make it permanent (run once):
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.cargo\bin", [System.EnvironmentVariableTarget]::User)
```

### Build errors about missing Solana
If you get errors about missing Solana toolchain during `anchor build`:
```powershell
# Install solana separately
cargo install solana-install
solana-install init 1.18.26
```

### "linker failed" errors
Make sure you have Visual Studio Build Tools or Visual Studio installed with C++ development tools.

## 📦 What Happens During Build

When you run `anchor build`, it will:
1. Download Solana toolchain (if not already installed)
2. Compile your Rust program
3. Generate a `.so` file in `target/deploy/`
4. Create an IDL (Interface Description Language) file

## ✅ Success Indicators

After successful build, you should see:
```
target/
  deploy/
    blueshift_anchor_vault.so  <-- This is what you upload!
    blueshift_anchor_vault-keypair.json
  idl/
    blueshift_anchor_vault.json
```

## 🚀 Next Steps After Build

1. Navigate to: https://learn.blueshift.gg/en/challenges/anchor-vault
2. Connect your Solana wallet (Phantom, Solflare, etc.)
3. Click "Take Challenge"
4. Upload `target\deploy\blueshift_anchor_vault.so`
5. Wait for verification
6. Receive your NFT! 🎉

## 📝 For Submission

Remember to note:
- Your wallet address that received the NFT
- Write and post your Twitter thread
- Submit both to Superteam Earn
