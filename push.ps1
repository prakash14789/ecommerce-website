param (
    [string]$Message = "Update from Antigravity"
)

git add .
git commit -m $Message
git push origin main
