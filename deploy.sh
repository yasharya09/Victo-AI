#!/bin/bash

# VICTO AI Docker deployment script (optional)
# This deploys Django + Next.js + Postgres + Nginx via docker-compose.

set -e

echo "Starting VICTO AI deployment (Docker)..."

if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Start Docker and try again."
  exit 1
fi

if [ ! -f .env.production ]; then
  echo ".env.production not found. Creating a template..."
  cat > .env.production << EOF
# Django
DEBUG=False
SECRET_KEY=your-super-secret-key-change-this
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,http://localhost:3000
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Database
POSTGRES_PASSWORD=your_postgres_password
DATABASE_URL=postgresql://victo_user:your_postgres_password@db:5432/victo_prod

# Frontend
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1/
EOF
  echo "Created .env.production. Update it with real values, then re-run."
  exit 1
fi

source .env.production

echo "Building Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

echo "Waiting for services to be ready..."
sleep 30

echo "Checking service health..."
if curl -f http://localhost/health > /dev/null 2>&1; then
  echo "All services are healthy."
else
  echo "Some services are not responding. Check logs with:"
  echo "  docker-compose -f docker-compose.prod.yml logs"
  exit 1
fi

echo "Deployment completed successfully."
echo ""
echo "Running services:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000"
echo "  Nginx: http://localhost"
echo ""
echo "Useful commands:"
echo "  View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  Stop services: docker-compose -f docker-compose.prod.yml down"
echo "  Restart: docker-compose -f docker-compose.prod.yml restart"
