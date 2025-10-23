Write-Host "Adding all changes to git..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Remove profit margin from dashboard and remove recent alerts card"

Write-Host "Showing commit status..." -ForegroundColor Green
git status

Write-Host ""
Write-Host "To push to your remote repository, run:" -ForegroundColor Yellow
Write-Host "git push origin main" -ForegroundColor Yellow
Write-Host "(or git push origin master, depending on your default branch name)" -ForegroundColor Yellow