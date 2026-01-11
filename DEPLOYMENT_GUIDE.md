# VICTO AI Deployment Guide

This guide covers production deployment with a focus on low-cost or free hosting.
Docker is optional.

## Option A: Single VPS (No Docker, lowest overhead)

Use a small VPS or free-tier VM. Recommended free tier: Oracle Cloud Free Tier.
Low-cost paid options: Hetzner, Contabo, DigitalOcean (if budget allows).

### 1) Server setup (Ubuntu 22.04)
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-venv python3-pip nginx postgresql
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2) Create a deploy user
```bash
sudo adduser victo
sudo usermod -aG sudo victo
su - victo
```

### 3) Clone and configure
```bash
git clone <your-repo-url> victo-ai
cd victo-ai
cp .env.example .env.local
cp backend/env.example backend/.env
```

Update `backend/.env` and `.env.local` with production values.

### 4) PostgreSQL database
```bash
sudo -u postgres psql
CREATE USER victoai_user WITH PASSWORD 'your_password';
CREATE DATABASE victoai_db OWNER victoai_user;
GRANT ALL PRIVILEGES ON DATABASE victoai_db TO victoai_user;
\q
```

Set `DATABASE_URL` in `backend/.env`.

### 5) Backend (Gunicorn)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

Create systemd service: `/etc/systemd/system/victo-backend.service`
```
[Unit]
Description=VICTO AI Django Backend
After=network.target

[Service]
User=victo
WorkingDirectory=/home/victo/victo-ai/backend
EnvironmentFile=/home/victo/victo-ai/backend/.env
ExecStart=/home/victo/victo-ai/backend/venv/bin/gunicorn --bind 127.0.0.1:8000 backend.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now victo-backend
```

### 6) Frontend (Next.js)
```bash
cd /home/victo/victo-ai
npm install
npm run build
```

Create systemd service: `/etc/systemd/system/victo-frontend.service`
```
[Unit]
Description=VICTO AI Next.js Frontend
After=network.target

[Service]
User=victo
WorkingDirectory=/home/victo/victo-ai
EnvironmentFile=/home/victo/victo-ai/.env.local
ExecStart=/usr/bin/node /home/victo/victo-ai/.next/standalone/server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable --now victo-frontend
```

### 7) Nginx reverse proxy

Create `/etc/nginx/sites-available/victo-ai`:
```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:
```bash
sudo ln -s /etc/nginx/sites-available/victo-ai /etc/nginx/sites-enabled/victo-ai
sudo nginx -t
sudo systemctl reload nginx
```

### 8) SSL (LetsEncrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Option B: Docker (Optional)

```bash
cp .env.example .env.production
# Edit .env.production for production values
./deploy.sh
```

## Operational Checklist

- Set `DEBUG=False` and unique `SECRET_KEY`
- Configure `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `CORS_ALLOWED_ORIGINS`
- Enable HTTPS and set `SECURE_SSL_REDIRECT=True`
- Run `python manage.py collectstatic --noinput`
- Keep backups of the database

