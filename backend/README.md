# VICTO AI Backend

Django REST API for the VICTO AI platform.

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp env.example .env
python manage.py migrate
python manage.py runserver
```

## Environment

See `env.example` for required variables.

## API Docs

- Swagger UI: `/swagger/`
- ReDoc: `/redoc/`
- Health: `/health/` and `/api/v1/health/`

