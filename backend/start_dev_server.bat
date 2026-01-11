@echo off
echo Starting Django Development Server with DEBUG=True...
echo.
echo This will ensure static files are served correctly.
echo.
set DEBUG=True
python manage.py runserver 0.0.0.0:8000
pause
