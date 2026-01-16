# Anchor Vault Challenge - Complete Guide

## 🎯 Project Status

✅ **COMPLETED:**
- Project structure created
- All source code implemented
- Cargo configuration files set up
- Program ID configured: `22222222222222222222222222222222222222222222`

⏳ **TO DO:**
- Install Anchor CLI
- Build the project
- Submit to Blueshift

---

## 📦 Project Structure

```
blueshift_anchor_vault/
├── Anchor.toml                          # Anchor project configuration
├── Cargo.toml                           # Workspace manifest
├── programs/
│   └── blueshift_anchor_vault/
│       ├── Cargo.toml                   # Program dependencies
│       ├── Xargo.toml                   # Cross-compilation settings
│       └── src/
│           └── lib.rs                   # ✅ MY VAULT IMPLEMENTATION
└── target/                              # (created after build)
    └── deploy/
        └── blueshift_anchor_vault.so    
```

---

## 🚀 OPTION 1: Install Anchor CLI (Recommended)

### Step 1: Open a NEW PowerShell Window

Close the VS Code terminal and open a fresh PowerShell window (as Administrator if possible).

### Step 2: Ensure Rust/Cargo is in PATH

```powershell
$env:Path += ";$env:USERPROFILE\.cargo\bin"
cargo --version
```

You should see: `cargo 1.91.1 (ea2d97820 2025-10-10)` or similar

### Step 3: Install Anchor CLI

**⚠️ THIS TAKES 15-20 MINUTES - DO NOT INTERRUPT!**

```powershell
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked
```

You'll see A LOT of compilation messages. This is normal. Wait for it to complete.

### Step 4: Verify Installation

```powershell
anchor --version
```

Should output: `anchor-cli 0.30.1`

### Step 5: Build the Project

```powershell
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build
```

The first build will take 5-10 minutes as it downloads and compiles Solana dependencies.

### Step 6: Verify Build Success

```powershell
ls target\deploy\blueshift_anchor_vault.so
```

If this file exists, you're ready to submit! 🎉

---

## 🔧 OPTION 2: Alternative Build Method (If Anchor fails)

If Anchor CLI installation fails, you can try building with cargo-build-bpf directly:

### Step 1: Install Solana Tools

```powershell
# Method A: Using cargo
cargo install solana-cli

# Method B: Using official installer
sh -c "$(curl -sSfL https://release.solana.com/v1.18.26/install)"
```

### Step 2: Install cargo-build-bpf

```powershell
cargo install cargo-build-bpf
```

### Step 3: Build the Program

```powershell
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\programs\blueshift_anchor_vault"
cargo build-bpf
```

---

## 📤 Submitting to Blueshift

### Step 1: Prepare Your Wallet

1. Install a Solana wallet browser extension:
   - Phantom: https://phantom.app/
   - Solflare: https://solflare.com/
   - Backpack: https://backpack.app/

2. Create a new wallet or import existing one

3. Switch to **Devnet** (for testing) or **Mainnet** (check Blueshift requirements)

4. **IMPORTANT**: Note your wallet address - you'll need it for the Superteam Earn submission!

### Step 2: Upload to Blueshift

1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault

2. Click "Connect Wallet" and connect your Solana wallet

3. Click "Take Challenge"

4. Upload the file: `target\deploy\blueshift_anchor_vault.so`

5. Wait for verification (usually takes a few seconds to a minute)

6. If successful, you'll receive an NFT to your connected wallet! 🎉

### Step 3: Verify NFT Receipt

Check your wallet to confirm you received the NFT. You can also check on:
- Solscan: https://solscan.io/
- Solana FM: https://solana.fm/
- Solana Explorer: https://explorer.solana.com/

---

## 🐦 Twitter Post

After completing the challenge, write a Twitter post about your experience. See `TWITTER_POST.md` for templates and tips.

**Key elements to include:**
- Mention @blueshift and @SuperteamUK
- Share 1-2 learnings
- Use hashtags: #Solana #Web3 #BuildInPublic
- Be authentic and enthusiastic!

---

## 📋 Superteam Earn Submission

Submit to Superteam Earn with:

1. **Wallet Address**: The exact address that received the Blueshift NFT
2. **Twitter Post**: Link to your tweet about the experience

**Important Eligibility Criteria:**
- ✅ You are a NEW web3 developer
- ✅ You have NOT secured paid web3 employment
- ✅ You have NOT previously passed a developer challenge bounty

---

## 🔍 Understanding the Code

Your implementation in `lib.rs` includes:

### `deposit` function:
1. Checks vault is empty (prevents double deposits)
2. Validates deposit amount > rent-exempt minimum
3. Transfers lamports from user to vault PDA

### `withdraw` function:
1. Checks vault has lamports
2. Creates PDA signer seeds
3. Transfers ALL lamports back to user

### Key Concepts:
- **PDA (Program Derived Address)**: Deterministic address derived from seeds
- **CPI (Cross-Program Invocation)**: Calling System Program to transfer lamports
- **Seeds**: `[b"vault", signer.key().as_ref()]` - unique per user

---

## ❓ Troubleshooting

### Anchor CLI won't install
**Solution**: Try cargo-build-bpf method (Option 2) or use WSL with Linux

### "Program ID mismatch" error
**Check**: Ensure `declare_id!` in lib.rs is `22222222222222222222222222222222222222222222`

### Build takes forever
**Normal**: First build downloads Solana toolchain (~2GB), takes 10-15 minutes

### "linker error" or "missing MSVC"
**Solution**: Install Visual Studio Build Tools with C++ support

### Blueshift upload fails
**Check**:
- You're uploading the `.so` file, not `.json`
- Wallet is connected
- File size is reasonable (~100KB - 1MB)

---

## 🎓 Learning Resources

- **Anchor Docs**: https://www.anchor-lang.com/docs
- **Solana Cookbook**: https://solanacookbook.com/
- **Blueshift Platform**: https://learn.blueshift.gg/
- **Superteam**: https://earn.superteam.fun/

---

## 🎉 After Completion

Once you pass the challenge:
- ✅ You'll be in Superteam UK's developer database
- ✅ You'll receive invites to developer-only telegram groups
- ✅ You'll get access to exclusive events and opportunities
- ✅ You'll have your first on-chain Solana program deployed!

---

## 📧 Need Help?

- Blueshift Discord: https://discord.gg/blueshift
- Superteam UK: Check their Telegram/Discord
- Solana Stack Exchange: https://solana.stackexchange.com/

---

**Good luck with your challenge! You've got this! 🚀**
