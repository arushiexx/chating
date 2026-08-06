$ErrorActionPreference = "Stop"

Write-Host "Downloading GitHub CLI..."
Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.53.0/gh_2.53.0_windows_amd64.zip" -OutFile "gh.zip"

Write-Host "Extracting..."
Expand-Archive -Path "gh.zip" -DestinationPath "." -Force

Write-Host "================================================="
Write-Host "PLEASE LOOK AT YOUR BROWSER IN A FEW SECONDS"
Write-Host "================================================="
Write-Host "Press ENTER when asked to 'Open a web browser'."
Write-Host "Then click 'Authorize github' in your browser."

.\gh_2.53.0_windows_amd64\bin\gh.exe auth login --web

Write-Host "Authentication successful! Pushing code..."
$env:PATH += ";$PWD\gh_2.53.0_windows_amd64\bin"

# Force push the new bundle directly using gh api!
# Wait, gh auth sets up git credential helper!
.\gh_2.53.0_windows_amd64\bin\gh.exe auth setup-git

Set-Location "C:\Users\Atul gupta\Downloads\influencer-bio"
git remote set-url origin "https://github.com/arushiexx/chating.git"
git add .
git commit -m "Final update with pics and QR"
git push -u origin main --force

Write-Host "DONE! Your site is fully updated on GitHub."
Start-Sleep -Seconds 5
