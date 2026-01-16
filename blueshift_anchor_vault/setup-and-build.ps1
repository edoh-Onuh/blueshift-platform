# Anchor Vault - Complete Setup and Build Script
# Run this script step by step in PowerShell

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Anchor Vault Challenge Setup Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify Rust is installed
Write-Host "Step 1: Verifying Rust installation..." -ForegroundColor Yellow
$env:Path += ";$env:USERPROFILE\.cargo\bin"
rustc --version
cargo --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Rust is not installed properly!" -ForegroundColor Red
    Write-Host "Please install Rust from: https://rustup.rs/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Rust is installed!" -ForegroundColor Green
Write-Host ""

# Step 2: Install Solana CLI
Write-Host "Step 2: Installing Solana CLI (this may take 10-15 minutes)..." -ForegroundColor Yellow
Write-Host "Installing Solana tools via cargo..." -ForegroundColor Gray

# Install solana-install
$installSolana = Read-Host "Do you want to install Solana CLI? This will take 10-15 minutes. (y/n)"
if ($installSolana -eq 'y') {
    Write-Host "Installing solana-install..." -ForegroundColor Gray
    cargo install solana-install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Now running solana-install to get the full toolchain..." -ForegroundColor Gray
        $env:Path += ";$env:USERPROFILE\.local\share\solana\install\active_release\bin"
        solana-install init 1.18.26
        
        # Add to PATH for current session
        $env:Path += ";$env:USERPROFILE\.local\share\solana\install\active_release\bin"
        
        Write-Host "✓ Solana CLI installed!" -ForegroundColor Green
        solana --version
    } else {
        Write-Host "WARNING: Solana installation failed. You may need to install it manually." -ForegroundColor Yellow
    }
} else {
    Write-Host "Skipping Solana CLI installation. Make sure it's installed before building." -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Install Anchor CLI
Write-Host "Step 3: Installing Anchor CLI (this may take 15-20 minutes)..." -ForegroundColor Yellow
$installAnchor = Read-Host "Do you want to install Anchor CLI? This will take 15-20 minutes. (y/n)"
if ($installAnchor -eq 'y') {
    Write-Host "Installing Anchor CLI v0.30.1..." -ForegroundColor Gray
    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.30.1 --locked
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Anchor CLI installed!" -ForegroundColor Green
        anchor --version
    } else {
        Write-Host "WARNING: Anchor installation failed. You may need to install it manually." -ForegroundColor Yellow
    }
} else {
    Write-Host "Skipping Anchor CLI installation." -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Build the project
Write-Host "Step 4: Building the Anchor Vault project..." -ForegroundColor Yellow
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"

$buildProject = Read-Host "Do you want to build the project now? (y/n)"
if ($buildProject -eq 'y') {
    Write-Host "Building with Anchor..." -ForegroundColor Gray
    anchor build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "====================================" -ForegroundColor Green
        Write-Host "✓ BUILD SUCCESSFUL!" -ForegroundColor Green
        Write-Host "====================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your compiled program is located at:" -ForegroundColor Cyan
        Write-Host "target\deploy\blueshift_anchor_vault.so" -ForegroundColor White
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault" -ForegroundColor White
        Write-Host "2. Connect your Solana wallet" -ForegroundColor White
        Write-Host "3. Click 'Take Challenge'" -ForegroundColor White
        Write-Host "4. Upload the .so file from target\deploy\" -ForegroundColor White
        Write-Host "5. Receive your NFT!" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "ERROR: Build failed!" -ForegroundColor Red
        Write-Host "Please check the error messages above." -ForegroundColor Red
    }
} else {
    Write-Host "Skipping build. You can build later with: anchor build" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup script completed!" -ForegroundColor Cyan
