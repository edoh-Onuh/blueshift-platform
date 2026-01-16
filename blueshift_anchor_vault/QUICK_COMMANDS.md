# Quick Start Commands

## Copy and paste these commands one by one in a NEW PowerShell window:

### 1️⃣ Setup PATH
```powershell
$env:Path += ";$env:USERPROFILE\.cargo\bin"
```

### 2️⃣ Verify Rust is working
```powershell
cargo --version
```

### 3️⃣ Install Anchor CLI (⏱️ Takes 15-20 minutes!)
```powershell
cargo install anchor-cli --version 0.30.1
```

### 4️⃣ Verify Anchor is installed
```powershell
anchor --version
```

### 5️⃣ Navigate to project
```powershell
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
```

### 6️⃣ Build the project (⏱️ Takes 5-10 minutes first time!)
```powershell
anchor build
```

### 7️⃣ Check build output
```powershell
ls target\deploy\blueshift_anchor_vault.so
```

## ✅ If you see the .so file, YOU'RE DONE!

Upload it to: https://learn.blueshift.gg/en/challenges/anchor-vault
