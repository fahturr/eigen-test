# Eigen Test

## Requirement

1. Node.Js (v16.17.0+)
2. Docker (v20.10.18+)

## Installation

Install dependencies terlebih dahulu
```bash
npm install
```

Duplikat file `.env.example` dan rename menjadi `.env`

Setelah itu isi variable pada file `.env`
```dotenv
APP_PORT=change_me
POSTGRES_HOST=change_me
POSTGRES_USER=change_me
POSTGRES_PASSWORD=change_me
POSTGRES_DB=change_me
```

Run database dengan menggunakan **Docker**
```bash
docker compose up -d
```

Jalankan aplikasi dengan perintah 
```bash
npm start
```

## API Spec

### GET /api-docs

Akses halaman ini untuk melihat semua API Spec nya. 