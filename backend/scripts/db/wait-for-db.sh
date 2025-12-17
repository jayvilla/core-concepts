#!/bin/bash

# Wait for PostgreSQL database to be ready
# Usage: ./scripts/db/wait-for-db.sh [max_attempts]

set -e

MAX_ATTEMPTS=${1:-30}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_NAME=${DB_NAME:-core_concepts}

echo "⏳ Waiting for PostgreSQL to be ready..."

attempt=0
while [ $attempt -lt $MAX_ATTEMPTS ]; do
    # Check if running in Docker
    if docker ps | grep -q core-concepts-postgres; then
        # Check Docker container health
        if docker exec core-concepts-postgres pg_isready -U "$DB_USERNAME" -d "$DB_NAME" > /dev/null 2>&1; then
            echo "✅ PostgreSQL is ready!"
            exit 0
        fi
    else
        # Check local connection
        if command -v psql &> /dev/null; then
            if PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
                echo "✅ PostgreSQL is ready!"
                exit 0
            fi
        fi
    fi
    
    attempt=$((attempt + 1))
    echo "   Attempt $attempt/$MAX_ATTEMPTS..."
    sleep 1
done

echo "❌ PostgreSQL is not ready after $MAX_ATTEMPTS attempts"
exit 1

