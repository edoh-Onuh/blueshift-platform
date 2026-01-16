# Quick Build Script (Use this if Anchor is already installed)

Write-Host "Building Anchor Vault project..." -ForegroundColor Cyan

# Ensure cargo is in PATH
$env:Path += ";$env:USERPROFILE\.cargo\bin"

# Navigate to project directory
cd "c:\Users\adanu\OneDrive\edoh-supperteam-platform\blueshift_anchor_vault"

# Build the project
Write-Host "Running: anchor build" -ForegroundColor Gray
anchor build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Compiled program location:" -ForegroundColor Cyan
    Write-Host "target\deploy\blueshift_anchor_vault.so" -ForegroundColor White
    Write-Host ""
    Write-Host "File size:" -ForegroundColor Cyan
    Get-Item "target\deploy\blueshift_anchor_vault.so" | Select-Object Name, Length | Format-Table
    Write-Host ""
    Write-Host "Next: Upload this file to Blueshift!" -ForegroundColor Yellow
    Write-Host "https://learn.blueshift.gg/en/challenges/anchor-vault" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✗ BUILD FAILED!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
    exit 1
}
