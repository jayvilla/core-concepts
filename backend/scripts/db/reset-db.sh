#!/bin/bash

# Reset PostgreSQL database (drop and recreate)
# Usage: ./scripts/db/reset-db.sh [database_name]
# WARNING: This will delete all data in the database!

set -e

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_NAME=${1:-${DB_NAME:-core_concepts}}

echo "⚠️  WARNING: This will delete and recreate the database '$DB_NAME'!"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Aborted"
    exit 1
fi

# Check if running in Docker or locally
if docker ps | grep -q core-concepts-postgres; then
    # Running in Docker
    echo "Using Docker container..."
    echo "🗑️  Dropping database: $DB_NAME"
    docker exec -i core-concepts-postgres psql -U "$DB_USERNAME" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null || true
    
    echo "📦 Creating database: $DB_NAME"
    docker exec -i core-concepts-postgres psql -U "$DB_USERNAME" -d postgres -c "CREATE DATABASE $DB_NAME;"
else
    # Running locally
    if ! command -v psql &> /dev/null; then
        echo "❌ Error: psql is not installed and Docker container is not running"
        exit 1
    fi
    
    echo "🗑️  Dropping database: $DB_NAME"
    PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null || true
    
    echo "📦 Creating database: $DB_NAME"
    PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d postgres -c "CREATE DATABASE $DB_NAME;"
fi

echo "✅ Database '$DB_NAME' reset successfully!"
echo ""
echo "💡 Next steps:"
echo "   1. Start your NestJS application"
echo "   2. TypeORM will automatically create tables (synchronize: true)"

