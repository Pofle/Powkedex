# Docker Setup for Development and Production

## Development

First, run the development server:

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build dev
docker compose -f compose.dev.yaml build

# Up dev
docker compose -f compose.dev.yaml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
A FIXER

---

## Production

Multistage builds are highly recommended in production. Combined with the **Next Output Standalone** feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the production server (Final image approximately **110 MB**):

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build prod
docker compose -f compose.prod.yaml build

# Up prod in detached mode
docker compose -f compose.prod.yaml up -d
```

Alternatively, run the production server without multistage builds (Final image approximately **1 GB**):

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build prod without multistage
docker compose -f compose.prod-without-multistage.yaml build

# Up prod without multistage in detached mode
docker compose -f compose.prod-without-multistage.yaml up -d
```

Open [http://localhost:3000](http://localhost:3000).

---

## Useful Commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```
