@echo off
title Git Pull Then Push - Flockmate Admin

echo ==========================================
echo Flockmate Admin Insight - Git Operations
echo ==========================================
echo.

REM Check if we're in the right directory
echo Checking current directory...
cd /d "c:\Users\JODIE\Desktop\React\flockmate-admin-insight"
echo Current directory: %CD%
echo.

REM Check if git is available
echo Checking if git is available...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)
echo Git is available
echo.

REM Check if this is a git repository
echo Checking if this is a git repository...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: This is not a git repository
    echo Please initialize git first with 'git init' and set up your remote
    pause
    exit /b 1
)
echo This is a git repository
echo.

REM Show current branch
echo Checking current branch...
for /f %%i in ('git branch --show-current') do set BRANCH=%%i
echo Current branch: %BRANCH%
echo.

REM Stash any local changes before pulling
echo Stashing any local changes...
git stash push -m "Stashed before pull"
if %errorlevel% equ 0 (
    echo Local changes stashed successfully
) else (
    echo No local changes to stash
)
echo.

REM Pull latest changes
echo Pulling latest changes from remote repository...
git pull origin %BRANCH%
if %errorlevel% neq 0 (
    echo WARNING: Pull failed. You may need to resolve conflicts manually
    echo Attempting to continue...
)
echo.

REM Pop stashed changes
echo Restoring stashed changes...
git stash pop >nul 2>&1
if %errorlevel% equ 0 (
    echo Stashed changes restored
) else (
    echo No stashed changes to restore
)
echo.

REM Show what will be committed
echo Checking git status...
git status
echo.

REM Add all changes
echo Adding all changes to git...
git add .
echo.

REM Commit changes
echo Committing changes...
git commit -m "Remove profit margin from dashboard and remove recent alerts card"
if %errorlevel% neq 0 (
    echo No changes to commit or commit failed
    echo.
) else (
    echo Changes committed successfully
    echo.
)

REM Push to remote repository
echo Pushing to remote repository...
git push origin %BRANCH%
if %errorlevel% neq 0 (
    echo ERROR: Push failed
    echo You may need to:
    echo 1. Check your internet connection
    echo 2. Verify your remote repository URL: git remote -v
    echo 3. Check your authentication credentials
    echo.
) else (
    echo Successfully pushed to remote repository
    echo.
)

echo.
echo ==========================================
echo Git operations completed
echo ==========================================
echo.
echo Summary of operations:
echo 1. Pulled latest changes from remote repository
echo 2. Committed local changes
echo 3. Pushed all changes to remote repository
echo.
pause