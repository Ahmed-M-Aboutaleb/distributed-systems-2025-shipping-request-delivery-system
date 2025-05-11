FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "No lockfile found, running npm install" && npm install; \
  fi

COPY . .

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]