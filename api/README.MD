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

4. Create a **.env** file in the root of the project and add the following variables:
```python
PORT=3333
DATABASE_URL="postgresql://user_concorri:password_concorri@localhost:5432/concorri_db"
JWT_SECRET="aidhbauhgdab81263t12836215t3dadufvsadugdf"
```
5. Add the migrations: 
```bash
npx prisma migrate dev
```

6. Run the API: 
```bash
npm run dev
```