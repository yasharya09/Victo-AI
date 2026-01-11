# VICTO AI - AI Security Solutions Platform

An enterprise-grade platform providing security solutions for AI/LLM applications.

## Features

- AI SOC monitoring for prompt activity, API usage, and model output
- AI/LLM security testing (VAPT)
- Incident response playbooks and workflows
- Output sanitization and risk analysis
- RAG security consulting
- Blog, resources, and case studies

## Tech Stack

Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

Backend
- Django 4.2
- Django REST Framework
- PostgreSQL (recommended)
- SimpleJWT

## Project Structure

```
src/                       Next.js frontend
  app/                     App Router pages
  components/              Reusable components
  config/                  Frontend config and env helpers
  hooks/                   Custom hooks
  lib/                     Utilities
  services/                API services
  styles/                  Global styles

backend/                   Django backend
  api/                     API endpoints
  authentication/          Auth endpoints
  contact_app/             Contact forms
  content_app/             Content management
  backend/                 Django project settings/urls
```

## Quick Start (Local)

1) Install dependencies
```bash
npm install
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

2) Configure environment
```bash
cp .env.example .env.local
cp backend/env.example backend/.env
```

3) Run services
```bash
# Terminal 1 - frontend
npm run dev

# Terminal 2 - backend
cd backend
python manage.py migrate
python manage.py runserver
```

Or use the helper script:
```bash
./quick-start.sh
```

## Scripts

Frontend
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - lint
- `npm run test` - unit tests

Backend
- `python manage.py runserver` - start dev server
- `python manage.py migrate` - apply migrations
- `python manage.py collectstatic` - collect static files

## Deployment

See `DEPLOYMENT_GUIDE.md` for both VPS (no Docker required) and Docker-based deployments.

## Security Notes

- Never commit `.env` files with secrets.
- Set `DEBUG=False` and configure `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, and HTTPS in production.

