#!/usr/bin/env python
"""
Start script for Django development server with proper configuration.
This ensures DEBUG=True and static files are served correctly.
"""

import os
import sys
import django
from django.core.management import execute_from_command_line


def main():
    os.environ['DEBUG'] = 'True'
    os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

    project_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, project_dir)

    django.setup()

    print("Starting Django Development Server...")
    print("DEBUG=True (static files will be served)")
    print("Server will run on http://127.0.0.1:8000/")
    print("Swagger UI: http://127.0.0.1:8000/swagger/")
    print("API endpoints: http://127.0.0.1:8000/api/v1/")
    print("")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)

    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])


if __name__ == '__main__':
    main()
