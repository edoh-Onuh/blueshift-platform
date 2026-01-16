# ✅ SYSTEM CHECK RESULTS

## 📊 What's Installed

✅ **Rust**: v1.91.1 - INSTALLED
✅ **Cargo**: v1.91.1 - INSTALLED  
✅ **WSL**: INSTALLED (but no Linux distribution yet)
❌ **Anchor CLI**: NOT INSTALLED (requires Visual Studio Build Tools on Windows)

## 🎯 NEXT STEPS TO BUILD YOUR PROJECT

You have TWO options:

---

## 🚀 OPTION 1: Use WSL (RECOMMENDED - 20 minutes)

This is the fastest way since WSL is already installed!

### Step 1: Install Ubuntu (3-5 minutes)

Run this in PowerShell **as Administrator**:

```powershell
wsl --install -d Ubuntu-24.04
```

**Important**: After installation, you may need to **restart your computer**. If prompted, do it!

### Step 2: Open Ubuntu & Set Up User

After restart (or if it opens automatically):
1. Ubuntu terminal will open
2. Create a username (e.g., `dev`)
3. Create a password
4. Wait for setup to complete

### Step 3: Install Rust in Ubuntu

Copy and paste these commands in Ubuntu terminal:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Press 1 to proceed with default installation
# After installation completes, run:
source $HOME/.cargo/env

# Verify Rust is installed
rustc --version
cargo --version
```

### Step 4: Install Anchor CLI (15-20 minutes)

```bash
# This takes time - be patient!
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked

# After installation, verify:
anchor --version
```

### Step 5: Build Your Project (5-10 minutes)

```bash
# Navigate to your project (Windows C: drive is at /mnt/c/)
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault

# Build the project
anchor build

# Check the output
ls -lh target/deploy/blueshift_anchor_vault.so
```

✅ **SUCCESS!** The `.so` file is ready at:
```
C:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\target\deploy\blueshift_anchor_vault.so
```

---

## 🔨 OPTION 2: Install Visual Studio Build Tools (30-40 minutes)

If you prefer to stay in Windows PowerShell:

### Step 1: Download & Install Build Tools

Run in PowerShell:

```powershell
# Download installer
Invoke-WebRequest -Uri "https://aka.ms/vs/17/release/vs_buildtools.exe" -OutFile "$env:TEMP\vs_buildtools.exe"

# Run installer
Start-Process -FilePath "$env:TEMP\vs_buildtools.exe" -Wait
```

### Step 2: In the Visual Studio Installer

1. Select: **"Desktop development with C++"**
2. Make sure these are checked:
   - MSVC v143 - VS 2022 C++ build tools
   - Windows SDK
3. Click **Install** (downloads ~6GB, takes 15-20 minutes)

### Step 3: Restart PowerShell

Close and reopen PowerShell as Administrator.

### Step 4: Install Anchor CLI

```powershell
$env:Path += ";$env:USERPROFILE\.cargo\bin"
cargo install anchor-cli --version 0.30.1
```

### Step 5: Build Project

```powershell
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build
```

---

## 💡 RECOMMENDATION

**Use Option 1 (WSL)** because:
- ✅ WSL is already installed on your system
- ✅ Faster (20 min vs 40 min)
- ✅ Less disk space (2GB vs 6GB)
- ✅ Standard for Solana development
- ✅ More reliable build process

---

## 🎬 Quick Start Command (FOR WSL)

Copy this single command and run as Administrator:

```powershell
wsl --install -d Ubuntu-24.04
```

Then restart your computer when prompted, and follow Steps 2-5 above!

---

## 📝 After Building

Once you have the `.so` file:

1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault
2. Connect your Solana wallet
3. Click "Take Challenge"
4. Upload: `blueshift_anchor_vault.so`
5. Receive your NFT! 🎉

---

## ❓ Need Help?

If you encounter any issues:
1. Make sure you're running PowerShell as Administrator for WSL installation
2. Restart your computer after installing Ubuntu
3. Check the other guide files in this folder for troubleshooting

**You're very close! Just install Ubuntu and you'll be building in 20 minutes!** 🚀
