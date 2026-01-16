# 🔧 IMMEDIATE ACTION REQUIRED - Build Tools Missing

## ❌ Current Issue

Your Anchor CLI installation failed with this error:
```
error: linker `link.exe` not found
```

**You need Microsoft Visual C++ Build Tools to compile Rust programs on Windows.**

---

## ✅ FASTEST SOLUTION (Choose One)

### 🚀 OPTION 1: Use WSL (RECOMMENDED - Fastest!)

This is the **quickest and easiest** way to build your project:

#### Step 1: Install WSL
```powershell
# Open PowerShell as Administrator and run:
wsl --install
```

**Then restart your computer.**

#### Step 2: After Restart, Open WSL
Search for "Ubuntu" in Start menu and open it.

#### Step 3: In WSL Ubuntu, run these commands:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Verify Rust is installed
rustc --version

# Install Anchor CLI (takes 15-20 minutes)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked

# Navigate to your project
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault

# Build the project
anchor build

# Check the output
ls -lh target/deploy/blueshift_anchor_vault.so
```

✅ **Done!** The `.so` file will be at:
`C:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\target\deploy\blueshift_anchor_vault.so`

---

### 🔨 OPTION 2: Install Visual Studio Build Tools

If you can't use WSL, install the build tools:

#### Step 1: Download the Installer

Run this in PowerShell:
```powershell
# Download the installer
Invoke-WebRequest -Uri "https://aka.ms/vs/17/release/vs_buildtools.exe" -OutFile "$env:TEMP\vs_buildtools.exe"

# Run the installer
Start-Process -FilePath "$env:TEMP\vs_buildtools.exe" -Wait
```

#### Step 2: In the Visual Studio Installer:

1. Select **"Desktop development with C++"**
2. Click **Install**
3. **Wait** 15-20 minutes for installation (~6GB download)
4. **Restart** PowerShell after installation

#### Step 3: Install Anchor CLI

After restart, open a NEW PowerShell window:
```powershell
$env:Path += ";$env:USERPROFILE\.cargo\bin"
cargo install anchor-cli --version 0.30.1
```

#### Step 4: Build the Project

```powershell
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build
```

---

## 🎯 What to Do Right Now

**I RECOMMEND OPTION 1 (WSL)** - It's faster, cleaner, and less disk space.

### Quick Decision Matrix:

| Question | Answer | Recommendation |
|----------|--------|----------------|
| Need to build NOW? | Yes | **Use WSL (Option 1)** |
| Plan to do more Rust dev? | Yes | Install Build Tools (Option 2) |
| Limited disk space? | Yes | **Use WSL (Option 1)** |
| Have 6GB+ free space? | Yes | Either option works |
| Want simplest solution? | Yes | **Use WSL (Option 1)** |

---

## 📋 Step-by-Step for WSL (RECOMMENDED)

### 1. Install WSL (5 minutes)

Open PowerShell **as Administrator** and run:
```powershell
wsl --install
```

Wait for it to complete, then **restart your computer**.

### 2. Open Ubuntu (2 minutes)

After restart:
1. Press Windows key
2. Type "Ubuntu"
3. Click "Ubuntu" app
4. Wait for initial setup (creates username/password)

### 3. Install Rust in WSL (2 minutes)

In the Ubuntu terminal:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Press Enter to accept defaults, then:
```bash
source $HOME/.cargo/env
```

### 4. Install Anchor CLI (15-20 minutes)

```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked
```

⏳ **Be patient!** This takes time. You'll see "Compiling..." messages.

### 5. Build Your Project (5-10 minutes)

```bash
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault
anchor build
```

### 6. Verify Success

```bash
ls -lh target/deploy/blueshift_anchor_vault.so
```

If you see the file with a size around 100KB-1MB, **YOU'RE DONE!** 🎉

---

## 🎉 After Successful Build

The compiled program will be at:
```
C:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault\target\deploy\blueshift_anchor_vault.so
```

### Next Steps:

1. ✅ Go to: https://learn.blueshift.gg/en/challenges/anchor-vault
2. ✅ Connect your Solana wallet
3. ✅ Click "Take Challenge"
4. ✅ Upload `blueshift_anchor_vault.so`
5. ✅ Get your NFT!
6. ✅ Post on Twitter (use templates in TWITTER_POST.md)
7. ✅ Submit to Superteam Earn

---

## ❓ Troubleshooting

### WSL Install fails?
```powershell
# Try enabling WSL feature manually:
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Then restart and try again:
wsl --install
```

### Can't run PowerShell as Administrator?
- Right-click PowerShell in Start menu
- Select "Run as Administrator"

### Anchor build fails in WSL?
Make sure you're using the correct path:
```bash
# Windows drives are mounted at /mnt/
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault
```

---

## 💡 Pro Tips

1. **WSL is your friend** - Once installed, you can use it for all Rust/Solana dev
2. **Keep WSL open** - You can leave the build running and check back later
3. **Files are accessible** - WSL can access all your Windows files at `/mnt/c/...`
4. **Use Windows Explorer** - You can open the output folder in Windows Explorer normally

---

## 🏁 Summary

**Choose WSL (Option 1)** unless you specifically need Windows native builds.

**Total time with WSL:** ~30-40 minutes
- 5 min: Install WSL
- 2 min: Setup Ubuntu  
- 2 min: Install Rust
- 20 min: Install Anchor
- 10 min: Build project

**You're almost there! Just one more step to get your NFT!** 🚀
