#!/bin/bash

# Drop PostgreSQL database
# Usage: ./scripts/db/drop-db.sh [database_name]
# WARNING: This will delete all data in the database!

set -e

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_NAME=${1:-${DB_NAME:-core_concepts}}

echo "⚠️  WARNING: This will delete the database '$DB_NAME' and all its data!"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Aborted"
    exit 1
fi

# Check if running in Docker or locally
if docker ps | grep -q core-concepts-postgres; then
    # Running in Docker
    echo "Using Docker container..."
    docker exec -i core-concepts-postgres psql -U "$DB_USERNAME" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
else
    # Running locally
    if ! command -v psql &> /dev/null; then
        echo "❌ Error: psql is not installed and Docker container is not running"
        exit 1
    fi
    
    PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
fi

echo "✅ Database '$DB_NAME' dropped successfully!"

