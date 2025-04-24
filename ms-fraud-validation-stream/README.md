# ms-fraud-validation-stream

Microservicio para leer notificaciones, procesar, rechazar solicitudes y registrar auditoria

## Dependencias

```bash
npm i prisma @prisma/client pino pino-pretty kafkajs date-fns uuidv4 zod

npm -D i @types/node
```

## Prisma Config

```bash
npx prisma init --datasource-provider postgresql

npx prisma generate

npx prisma db pull

npx tsx prisma/seed.ts
```
