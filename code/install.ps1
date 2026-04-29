Write-Host "========================================" -ForegroundColor Cyan
Write-Host "IoT Hydration Dashboard - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor Green

# Check if Node.js version is at least v16
$versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($versionNumber -lt 16) {
    Write-Host ""
    Write-Host "WARNING: Node.js version is too old!" -ForegroundColor Red
    Write-Host "You need Node.js v20.x or higher." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "Checking npm version..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "npm: $npmVersion" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleaning old installations..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Remove old node_modules and package-lock
if (Test-Path "node_modules") {
    Write-Host "Removing old node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing old package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force package-lock.json
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Installation complete! ✓" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Cyan
    Write-Host "    npm run dev" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then open: http://localhost:5173" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Installation failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try the following:" -ForegroundColor Yellow
    Write-Host "1. Update Node.js to v20.x from https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Clear npm cache: npm cache clean --force" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
}

pause
