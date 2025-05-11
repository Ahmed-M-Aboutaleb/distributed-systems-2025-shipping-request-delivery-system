---

## 7. Dockerizing a Next.js App

Below is a simple multi-stage `Dockerfile` and accompanying `docker-compose.yml` (with both production and dev-mode services) for a Next.js project.

### 7.1 Multi-stage `Dockerfile`

```dockerfile
# Stage 1: Install & build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Only copy the necessary bits
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port and start
EXPOSE 3000
CMD ["npm", "run", "start"]
