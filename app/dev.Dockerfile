# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

# Install OpenSSL and netcat for Prisma and health checks
RUN apk add --no-cache openssl netcat-openbsd

WORKDIR /app

# Copy gestion files of depencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies depend on file manager dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "!! Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
  fi

# Copy the rest of the application
COPY . .

# Copy the rest of the application
COPY init.sh /app/init.sh
RUN chmod +x /app/init.sh

# Note: Don't expose ports here, Compose will handle that for us

# Start script when container is run
CMD ["/app/init.sh"]