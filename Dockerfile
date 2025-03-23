# Build stage
FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./

RUN npm ci


COPY . .

RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app




COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static


EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 