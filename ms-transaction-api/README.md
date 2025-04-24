# ms-transaction-api

Microservicio para recibir transacciones

## Dependencias

```bash
npm i express express-validator prisma @prisma/client zod swagger-ui-express swagger-jsdoc pino pino-http pino-pretty kafkajs date-fns

npm -D i @types/express @types/swagger-ui-express @types/node
```

## Prisma Config

```bash
npx prisma init --datasource-provider postgresql

npx prisma generate

npx prisma db pull

npx tsx prisma/seed.ts
```
