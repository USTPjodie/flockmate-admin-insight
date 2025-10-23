# Flockmate Admin Insight - Git Push Script
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Flockmate Admin Insight - Git Push Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
Write-Host "Checking current directory..." -ForegroundColor Yellow
Set-Location "c:\Users\JODIE\Desktop\React\flockmate-admin-insight"
Write-Host "Current directory: $((Get-Location).Path)" -ForegroundColor Green
Write-Host ""

# Check if git is available
Write-Host "Checking if git is available..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "$gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    pause
    exit 1
}
Write-Host ""

# Check if this is a git repository
Write-Host "Checking if this is a git repository..." -ForegroundColor Yellow
try {
    git rev-parse --is-inside-work-tree > $null 2>&1
    Write-Host "This is already a git repository" -ForegroundColor Green
} catch {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Add all changes
Write-Host "Adding all changes to git..." -ForegroundColor Yellow
git add .
Write-Host ""

# Check what will be committed
Write-Host "Checking what will be committed..." -ForegroundColor Yellow
git status --porcelain
Write-Host ""

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
try {
    git commit -m "Remove profit margin from dashboard and remove recent alerts card"
    Write-Host "Changes committed successfully" -ForegroundColor Green
} catch {
    Write-Host "No changes to commit or commit failed" -ForegroundColor Yellow
}
Write-Host ""

# Show current branch
Write-Host "Checking current branch..." -ForegroundColor Yellow
git branch
Write-Host ""

# Try to push to origin
Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "Successfully pushed to main branch" -ForegroundColor Green
} catch {
    Write-Host "Trying to push to master branch..." -ForegroundColor Yellow
    try {
        git push origin master
        Write-Host "Successfully pushed to master branch" -ForegroundColor Green
    } catch {
        Write-Host "Push failed. You may need to:" -ForegroundColor Red
        Write-Host "1. Set up your remote repository: git remote add origin <your-repo-url>" -ForegroundColor Yellow
        Write-Host "2. Or push to your specific branch" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Git operations completed" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary of changes made:" -ForegroundColor Yellow
Write-Host "1. Removed profit margin from dashboard display" -ForegroundColor Yellow
Write-Host "2. Removed recent alerts card from dashboard" -ForegroundColor Yellow
Write-Host "3. Updated imports and comments" -ForegroundColor Yellow
Write-Host ""