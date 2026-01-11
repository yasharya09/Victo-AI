# PowerShell script to start Django development server with DEBUG=True
Write-Host "Starting Django Development Server with DEBUG=True..." -ForegroundColor Green
Write-Host ""
Write-Host "This will ensure static files are served correctly." -ForegroundColor Yellow
Write-Host ""

# Set environment variable
$env:DEBUG = "True"

# Start the server
python manage.py runserver 0.0.0.0:8000

Write-Host ""
Write-Host "Server stopped. Press any key to exit..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
