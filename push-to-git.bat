@echo off
title Push Changes to Git

echo ==========================================
echo Flockmate Admin Insight - Git Push Script
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
    echo Initializing git repository...
    git init
    echo.
)

REM Check git status
echo Checking git status...
git status
echo.

REM Add all changes
echo Adding all changes to git...
git add .
echo.

REM Check what will be committed
echo Checking what will be committed...
git status --porcelain
echo.

REM Commit changes
echo Committing changes...
git commit -m "Remove profit margin from dashboard and remove recent alerts card"
if %errorlevel% neq 0 (
    echo No changes to commit or commit failed
    echo.
)

REM Show current branch
echo Checking current branch...
git branch
echo.

REM Try to push to origin
echo Pushing to remote repository...
git push origin main
if %errorlevel% neq 0 (
    echo Trying to push to master branch...
    git push origin master
    if %errorlevel% neq 0 (
        echo Push failed. You may need to:
        echo 1. Set up your remote repository: git remote add origin ^<your-repo-url^>
        echo 2. Or push to your specific branch
        echo.
    )
)

echo.
echo ==========================================
echo Git operations completed
echo ==========================================
echo.
echo Summary of changes made:
echo 1. Removed profit margin from dashboard display
echo 2. Removed recent alerts card from dashboard
echo 3. Updated imports and comments
echo.
pause