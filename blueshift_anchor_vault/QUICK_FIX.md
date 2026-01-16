# 🎯 QUICK SOLUTION - Copy These Commands

## ⚡ FASTEST WAY: Use WSL

### 1️⃣ Install WSL (Run in PowerShell as Admin)
```powershell
wsl --install
```
**Then RESTART your computer.**

---

### 2️⃣ After restart, open "Ubuntu" from Start menu

Run these commands in Ubuntu:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install Anchor (takes 15-20 minutes - BE PATIENT!)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked

# Navigate to project
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault

# Build (takes 5-10 minutes)
anchor build

# Check output
ls -lh target/deploy/blueshift_anchor_vault.so
```

---

### 3️⃣ Upload to Blueshift

File location in Windows:
```
C:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\target\deploy\blueshift_anchor_vault.so
```

Upload here: https://learn.blueshift.gg/en/challenges/anchor-vault

---

## ✅ DONE!

That's it! Three steps:
1. Install WSL & restart
2. Run commands in Ubuntu
3. Upload the .so file

**Total time: ~30-40 minutes (mostly waiting for installations)**
