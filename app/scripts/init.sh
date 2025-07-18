#!/bin/sh

set -e

echo "Waiting for PostgreSQL to be available..."

# Wait postgr is ready
while ! nc -z postgres 5432; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Postgres is up - applying migrations..."

# Apply migrations
npx prisma migrate deploy
# Generate prisma client
npx prisma generate

echo "Migrations applied and Prisma client generated."

# Start Next.js depend on package manager file
if [ -f yarn.lock ]; then
  yarn dev
elif [ -f package-lock.json ]; then
  npm run dev
elif [ -f pnpm-lock.yaml ]; then
  pnpm dev
else
  npm run dev
fi