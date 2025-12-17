# Scripts Reference

This document describes all available npm/pnpm scripts for managing Docker and database operations.

## Docker Scripts

### `pnpm docker:up`
Start PostgreSQL container in detached mode.

```bash
pnpm docker:up
```

**What it does:**
- Starts PostgreSQL container using docker-compose
- Runs in background (detached mode)
- Creates persistent volume for data

### `pnpm docker:down`
Stop and remove PostgreSQL container.

```bash
pnpm docker:down
```

**What it does:**
- Stops PostgreSQL container
- Removes container (data is preserved in volume)

### `pnpm docker:logs`
View PostgreSQL container logs (follow mode).

```bash
pnpm docker:logs
```

**What it does:**
- Shows real-time logs from PostgreSQL container
- Press `Ctrl+C` to exit

### `pnpm docker:restart`
Restart PostgreSQL container.

```bash
pnpm docker:restart
```

**What it does:**
- Restarts PostgreSQL container
- Useful after configuration changes

### `pnpm docker:ps`
Show status of Docker containers.

```bash
pnpm docker:ps
```

**What it does:**
- Lists all containers defined in docker-compose.yaml
- Shows status, ports, and names

### `pnpm docker:clean`
Stop containers and remove volumes (WARNING: deletes all data!).

```bash
pnpm docker:clean
```

**What it does:**
- Stops and removes containers
- Removes volumes (deletes all database data)
- Use with caution!

## Database Scripts

### `pnpm db:create`
Create PostgreSQL database.

```bash
pnpm db:create
```

**What it does:**
- Creates database (default: `core_concepts`)
- Works with Docker container or local PostgreSQL
- Safe to run multiple times (won't error if exists)

**Usage:**
```bash
# Create default database
pnpm db:create

# Create custom database (via script)
./scripts/db/create-db.sh my_database
```

### `pnpm db:drop`
Drop PostgreSQL database (WARNING: deletes all data!).

```bash
pnpm db:drop
```

**What it does:**
- Permanently deletes database and all data
- Requires confirmation (type "yes")
- Works with Docker container or local PostgreSQL

### `pnpm db:reset`
Reset database (drop and recreate).

```bash
pnpm db:reset
```

**What it does:**
- Drops existing database
- Creates new empty database
- Requires confirmation
- Useful for starting fresh

### `pnpm db:wait`
Wait for PostgreSQL to be ready.

```bash
pnpm db:wait
```

**What it does:**
- Waits for PostgreSQL to accept connections
- Checks health every second
- Times out after 30 attempts (default)
- Useful in CI/CD pipelines

**Usage:**
```bash
# Wait with default timeout (30 seconds)
pnpm db:wait

# Wait with custom timeout (via script)
./scripts/db/wait-for-db.sh 60
```

## Combined Workflow Scripts

### `pnpm db:setup`
Complete database setup (Docker + wait + create).

```bash
pnpm db:setup
```

**What it does:**
1. Starts Docker container (`docker:up`)
2. Waits for database to be ready (`db:wait`)
3. Creates database (`db:create`)

**Use case:**
- First-time setup
- After cleaning volumes
- Quick reset with fresh database

### `pnpm dev:setup`
Complete development setup (database + start app).

```bash
pnpm dev:setup
```

**What it does:**
1. Runs `db:setup` (Docker + wait + create)
2. Starts NestJS in development mode (`start:dev`)

**Use case:**
- Starting development session
- Ensures database is ready before app starts

## Common Workflows

### First Time Setup

```bash
# 1. Start Docker container
pnpm docker:up

# 2. Wait for database to be ready
pnpm db:wait

# 3. Create database
pnpm db:create

# 4. Start application (TypeORM will create tables)
pnpm start:dev
```

Or use the combined script:
```bash
pnpm dev:setup
```

### Daily Development

```bash
# Start Docker (if not running)
pnpm docker:up

# Start application
pnpm start:dev
```

### Reset Everything

```bash
# Stop and remove containers + volumes
pnpm docker:clean

# Start fresh
pnpm db:setup

# Start application
pnpm start:dev
```

### View Database Logs

```bash
# View PostgreSQL logs
pnpm docker:logs
```

### Check Container Status

```bash
# See if containers are running
pnpm docker:ps
```

## Environment Variables

Create a `.env` file in the backend root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=core_concepts
NODE_ENV=development
```

These variables are used by:
- Docker Compose (for container configuration)
- Database scripts (for connection)
- NestJS application (for TypeORM connection)

## Troubleshooting

### Container won't start

```bash
# Check if port is already in use
lsof -i :5432

# Check Docker is running
docker ps

# View logs
pnpm docker:logs
```

### Can't connect to database

```bash
# Check container is running
pnpm docker:ps

# Wait for database to be ready
pnpm db:wait

# Check connection manually
docker exec -it core-concepts-postgres psql -U postgres -d core_concepts
```

### Database scripts fail

```bash
# Ensure container is running
pnpm docker:ps

# If using local PostgreSQL, ensure it's installed and running
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

## Script Files

All database scripts are located in `scripts/db/`:

- `create-db.sh` - Create database
- `drop-db.sh` - Drop database
- `reset-db.sh` - Reset database
- `wait-for-db.sh` - Wait for database

These scripts automatically detect if running in Docker or locally and use the appropriate method.

