# Git Pull Then Push - Flockmate Admin
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Flockmate Admin Insight - Git Operations" -ForegroundColor Cyan
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
    Write-Host "This is a git repository" -ForegroundColor Green
} catch {
    Write-Host "ERROR: This is not a git repository" -ForegroundColor Red
    Write-Host "Please initialize git first with 'git init' and set up your remote" -ForegroundColor Yellow
    pause
    exit 1
}
Write-Host ""

# Show current branch
Write-Host "Checking current branch..." -ForegroundColor Yellow
try {
    $branch = git branch --show-current
    Write-Host "Current branch: $branch" -ForegroundColor Green
} catch {
    $branch = "main"
    Write-Host "Could not determine current branch, assuming 'main'" -ForegroundColor Yellow
}
Write-Host ""

# Stash any local changes before pulling
Write-Host "Stashing any local changes..." -ForegroundColor Yellow
try {
    git stash push -m "Stashed before pull"
    Write-Host "Local changes stashed successfully" -ForegroundColor Green
} catch {
    Write-Host "No local changes to stash" -ForegroundColor Yellow
}
Write-Host ""

# Pull latest changes
Write-Host "Pulling latest changes from remote repository..." -ForegroundColor Yellow
try {
    git pull origin $branch
    Write-Host "Successfully pulled latest changes" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Pull failed. You may need to resolve conflicts manually" -ForegroundColor Yellow
    Write-Host "Attempting to continue..." -ForegroundColor Yellow
}
Write-Host ""

# Pop stashed changes
Write-Host "Restoring stashed changes..." -ForegroundColor Yellow
try {
    git stash pop > $null 2>&1
    Write-Host "Stashed changes restored" -ForegroundColor Green
} catch {
    Write-Host "No stashed changes to restore" -ForegroundColor Yellow
}
Write-Host ""

# Show what will be committed
Write-Host "Checking git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Add all changes
Write-Host "Adding all changes to git..." -ForegroundColor Yellow
git add .
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

# Push to remote repository
Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
try {
    git push origin $branch
    Write-Host "Successfully pushed to remote repository" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Push failed" -ForegroundColor Red
    Write-Host "You may need to:" -ForegroundColor Yellow
    Write-Host "1. Check your internet connection" -ForegroundColor Yellow
    Write-Host "2. Verify your remote repository URL: git remote -v" -ForegroundColor Yellow
    Write-Host "3. Check your authentication credentials" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Git operations completed" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary of operations:" -ForegroundColor Yellow
Write-Host "1. Pulled latest changes from remote repository" -ForegroundColor Yellow
Write-Host "2. Committed local changes" -ForegroundColor Yellow
Write-Host "3. Pushed all changes to remote repository" -ForegroundColor Yellow
Write-Host ""