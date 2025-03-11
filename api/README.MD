# Concorri - API

## Tech Stack
- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Fastify

## How run it?
1. Go to **api** folder: 
```bash
cd api
```

2. Install dependencies:
``` bash
 npm install
```

3. Run docker container: 
```bash
docker-compose up -d
```

4. Copy environment variables:
```bash
cp .env.example .env
```

5. Add the migrations: 
```bash
npm run db:migrate
```

6. Run the API: 
```bash
npm run dev
```