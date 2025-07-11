# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

# Instal  OpenSSL and libs for prisma which is not in the image
RUN apk add --no-cache openssl

WORKDIR /app

# Copy gestion files of depencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies depend on file manager dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "!! Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

# Install TailwindCSS and Font Awesome for react
RUN npm install tailwindcss @tailwindcss/postcss postcss \
    && npm install @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

# Install Prisma and PostgreSQL client
RUN npm install prisma @prisma/client

COPY . .

# Generate Prisma client
#RUN npx prisma generate -> in script
# Generate Prisma client only if schema exists
#RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Copy script init.sh in /app/init.sh and set it executable
COPY init.sh /app/init.sh
RUN chmod +x /app/init.sh

# Note: Don't expose ports here, Compose will handle that for us

# Start script when container is run
CMD ["/app/init.sh"]