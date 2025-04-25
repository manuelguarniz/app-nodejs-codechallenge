# Stage Build
FROM node:22-alpine as builder
RUN echo "Starting build..." 
WORKDIR /app

COPY ms-transaction-api/package*.json ./
COPY ms-transaction-api/tsconfig.json ./
COPY ms-transaction-api/prisma ./prisma
COPY ms-transaction-api/src ./src

RUN npm ci
RUN npx prisma generate
RUN npm run build

# Stage production
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "./dist/index.js"]