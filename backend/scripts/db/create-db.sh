#!/bin/bash

# Create PostgreSQL database
# Usage: ./scripts/db/create-db.sh [database_name]

set -e

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_NAME=${1:-${DB_NAME:-core_concepts}}

echo "📦 Creating database: $DB_NAME"

# Check if running in Docker or locally
if docker ps | grep -q core-concepts-postgres; then
    # Running in Docker
    echo "Using Docker container..."
    docker exec -i core-concepts-postgres psql -U "$DB_USERNAME" -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || {
        if [ $? -eq 2 ]; then
            echo "✅ Database '$DB_NAME' already exists"
        else
            echo "❌ Error creating database"
            exit 1
        fi
    }
else
    # Running locally
    if ! command -v psql &> /dev/null; then
        echo "❌ Error: psql is not installed and Docker container is not running"
        echo "   Please install PostgreSQL client tools or start Docker container"
        exit 1
    fi
    
    PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || {
        if [ $? -eq 2 ]; then
            echo "✅ Database '$DB_NAME' already exists"
        else
            echo "❌ Error creating database"
            exit 1
        fi
    }
fi

echo "✅ Database '$DB_NAME' created successfully!"

