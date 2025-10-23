@echo off
echo Adding all changes to git...
git add .

echo Committing changes...
git commit -m "Remove profit margin from dashboard and remove recent alerts card"

echo Showing commit status...
git status

echo.
echo To push to your remote repository, run:
echo git push origin main
echo (or git push origin master, depending on your default branch name)
pause