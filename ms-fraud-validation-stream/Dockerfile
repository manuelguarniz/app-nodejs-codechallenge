# Stage Build
FROM node:22-alpine as builder
RUN echo "Starting build..." 
WORKDIR /app

COPY ms-fraud-validation-stream/package*.json ./
COPY ms-fraud-validation-stream/tsconfig.json ./
COPY ms-fraud-validation-stream/prisma ./prisma
COPY ms-fraud-validation-stream/src ./src

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

CMD ["node", "./dist/index.js"]