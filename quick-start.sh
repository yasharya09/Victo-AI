#!/bin/bash

# VICTO AI local dev bootstrap (no Docker required)

set -e

echo "Starting VICTO AI local setup..."

if [ ! -f .env.local ]; then
  echo "Creating .env.local from .env.example..."
  cp .env.example .env.local
fi

if [ ! -f backend/.env ]; then
  echo "Creating backend/.env from backend/env.example..."
  cp backend/env.example backend/.env
fi

echo "Setting up backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000 &
DJANGO_PID=$!
cd ..

echo "Setting up frontend..."
npm install
npm run dev &
NEXTJS_PID=$!

echo ""
echo "Development environment started:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://127.0.0.1:8000"
echo "  Swagger Docs: http://127.0.0.1:8000/swagger/"
echo ""
echo "To stop the servers, press Ctrl+C"
echo "Or run: kill $DJANGO_PID $NEXTJS_PID"

wait
