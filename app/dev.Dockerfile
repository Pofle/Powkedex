# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
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
#COPY src ./src
#COPY public ./public
#COPY next.config.js .
#COPY tsconfig.json .
#COPY postcss.config.mjs .

# Generate Prisma client
RUN npx prisma generate
# Generate Prisma client only if schema exists
#RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f package-lock.json ]; then npm run dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
  else npm run dev; \
  fi