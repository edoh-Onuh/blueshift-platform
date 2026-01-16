# 🎉 Ubuntu WSL Successfully Installed!

## ✅ Current Status
- Ubuntu 24.04.1 LTS is running
- User: edoh_onuh
- Ready to install Rust and Anchor

---

## 📋 COPY AND PASTE THESE COMMANDS IN UBUNTU

### Step 1: Install Rust (2 minutes)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

When prompted, press `1` and Enter to proceed with default installation.

After installation completes, run:
```bash
source $HOME/.cargo/env
```

Verify Rust is installed:
```bash
rustc --version
cargo --version
```

---

### Step 2: Install Anchor CLI (15-20 minutes)

⚠️ **This takes time - be patient! You'll see lots of "Compiling..." messages.**

```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked
```

After installation, verify:
```bash
anchor --version
```

You should see: `anchor-cli 0.30.1`

---

### Step 3: Navigate to Your Project

```bash
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault
```

Verify you're in the right place:
```bash
pwd
ls -la
```

You should see `Anchor.toml`, `Cargo.toml`, and `programs/` directory.

---

### Step 4: Build the Project (5-10 minutes)

```bash
anchor build
```

This will:
1. Download Solana toolchain (first time only)
2. Compile your Rust program
3. Generate the `.so` file in `target/deploy/`

---

### Step 5: Verify Build Success

```bash
ls -lh target/deploy/blueshift_anchor_vault.so
```

If you see the file with size ~100KB-1MB, **YOU'RE DONE!** 🎉

---

## 📍 Output File Location

**In Ubuntu/WSL:**
```
/mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault/target/deploy/blueshift_anchor_vault.so
```

**In Windows:**
```
C:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\target\deploy\blueshift_anchor_vault.so
```

---

## 🚀 Next: Upload to Blueshift

1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault
2. Connect your Solana wallet (Phantom, Solflare, etc.)
3. Click "Take Challenge"
4. Upload: `blueshift_anchor_vault.so`
5. Get your NFT! 🎉

---

## ⏱️ Timeline

- ✅ Ubuntu installed (DONE!)
- ⏳ Install Rust: 2 minutes
- ⏳ Install Anchor: 15-20 minutes (mostly automated)
- ⏳ Build project: 5-10 minutes (automated)
- ⏳ Upload: 2 minutes

**Total remaining: ~25-35 minutes**

---

## 💡 Tips

1. **Copy commands one at a time** - Wait for each to complete
2. **Don't interrupt** the Anchor installation - it takes time!
3. **First build is slow** - Downloads Solana toolchain
4. **Keep Ubuntu open** - You can minimize it while things compile

---

## 🎯 START HERE

Copy the first command from Step 1 above and paste it into your Ubuntu terminal!

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**You're doing great! Just a few more steps!** 🚀
