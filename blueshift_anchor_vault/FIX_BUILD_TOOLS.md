# Installing Visual Studio Build Tools

## The Issue
You're getting this error:
```
error: linker `link.exe` not found
note: the msvc targets depend on the msvc linker but `link.exe` was not found
note: please ensure that Visual Studio 2017 or later, or Build Tools for Visual Studio were installed with the Visual C++ option.
```

This means you need the Microsoft Visual C++ Build Tools to compile Rust programs on Windows.

## Solution Options

### Option 1: Install Visual Studio Build Tools (Recommended - 6GB download)

1. **Download** the installer:
   - Go to: https://visualstudio.microsoft.com/downloads/
   - Scroll down to "Tools for Visual Studio"
   - Download "Build Tools for Visual Studio 2022"

2. **Run** the installer

3. **Select** these workloads:
   - ✅ "Desktop development with C++"
   - In the right panel, make sure these are checked:
     - MSVC v143 - VS 2022 C++ x64/x86 build tools
     - Windows 10 SDK (or Windows 11 SDK)

4. **Click Install** (this takes 10-15 minutes and downloads ~6GB)

5. **Restart PowerShell** after installation

6. **Try again**:
   ```powershell
   cargo install anchor-cli --version 0.30.1
   ```

### Option 2: Quick Install via Winget (If available)

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools --override "--wait --quiet --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
```

### Option 3: Use WSL (Windows Subsystem for Linux) - Faster Alternative

If you have WSL installed (or can install it), this is often faster:

```powershell
# Install WSL (if not already installed)
wsl --install

# Restart your computer

# Then in WSL Ubuntu:
```

```bash
# Install Rust in WSL
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked

# Navigate to your project (Windows drives are at /mnt/)
cd /mnt/c/Users/adanu/OneDrive/edoh-supperteam-platform/blueshift_anchor_vault

# Build
anchor build
```

## After Installing Build Tools

Once Visual Studio Build Tools are installed, run these commands:

```powershell
# Ensure cargo is in PATH
$env:Path += ";$env:USERPROFILE\.cargo\bin"

# Install Anchor CLI (this will take 15-20 minutes)
cargo install anchor-cli --version 0.30.1

# Verify installation
anchor --version

# Build the project
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build
```

## Which Option Should You Choose?

| Option | Time | Disk Space | Recommendation |
|--------|------|------------|----------------|
| **VS Build Tools** | 20-30 min | ~6GB | Best if you plan to do more Rust/C++ development |
| **WSL** | 15-20 min | ~2GB | Best for quick one-time builds |
| **Winget** | 20-30 min | ~6GB | Same as option 1, just automated |

## Verification

After installation, verify it worked:

```powershell
# This should now work without errors:
rustc --version
cargo --version

# Try a simple cargo project
cargo new test_project
cd test_project
cargo build
```

If the test project builds successfully, you're ready to install Anchor CLI!
