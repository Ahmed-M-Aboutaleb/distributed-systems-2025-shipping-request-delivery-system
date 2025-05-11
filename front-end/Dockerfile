# 1. Use an official Node.js runtime as a parent image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Install dependencies first (to leverage Docker layer caching)
COPY package.json package-lock.json* yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "No lockfile found, running npm install" && npm install; \
  fi

# 4. Copy the rest of your application code
COPY . .

# 5. Expose Next.js default dev port
EXPOSE 3000

# 6. Set environment variable for development
ENV NODE_ENV=development

# 7. Start Next.js in development mode
CMD ["npm", "run", "dev"]