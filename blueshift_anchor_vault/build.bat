@echo off
REM Anchor Vault Build Script for Windows
REM Run this in Command Prompt (cmd.exe)

echo ================================
echo Anchor Vault Challenge Builder
echo ================================
echo.

REM Add cargo to PATH
set PATH=%PATH%;%USERPROFILE%\.cargo\bin

echo Step 1: Checking Rust installation...
cargo --version
if errorlevel 1 (
    echo ERROR: Cargo not found! Please install Rust first.
    echo Visit: https://rustup.rs/
    pause
    exit /b 1
)
echo OK: Cargo found!
echo.

echo Step 2: Checking for Anchor CLI...
anchor --version 2>nul
if errorlevel 1 (
    echo Anchor CLI not found. Installing now...
    echo WARNING: This will take 15-20 minutes!
    echo.
    pause
    cargo install anchor-cli --version 0.30.1
    if errorlevel 1 (
        echo ERROR: Anchor installation failed!
        pause
        exit /b 1
    )
) else (
    echo OK: Anchor CLI found!
)
echo.

echo Step 3: Building the project...
cd /d "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"
anchor build

if errorlevel 1 (
    echo.
    echo ERROR: Build failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ================================
echo BUILD SUCCESSFUL!
echo ================================
echo.
echo Your compiled program is at:
echo target\deploy\blueshift_anchor_vault.so
echo.
echo Next steps:
echo 1. Go to: https://learn.blueshift.gg/en/challenges/anchor-vault
echo 2. Connect your wallet
echo 3. Click 'Take Challenge'
echo 4. Upload the .so file
echo 5. Receive your NFT!
echo.
pause
