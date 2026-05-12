# PostgreSQL + Prisma Migration Guide

This document outlines the complete setup for migrating from Supabase to a local PostgreSQL backend using Prisma ORM.

## Prerequisites

- PostgreSQL installed locally (version 12+)
- Node.js 18+
- pnpm or npm

## Setup Steps

### 1. Install Dependencies

```bash
pnpm install @prisma/client
pnpm install -D prisma
```

### 2. Database Configuration

#### Configure .env file

Create a `.env` file in the project root with your PostgreSQL connection:

```env
# PostgreSQL Database Connection (Local)
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/gentech"

# Prisma Configuration
PRISMA_LOG_LEVEL="debug"
```

**Database URL Breakdown:**
- `postgresql://` - Protocol
- `postgres` - Default username (change if different)
- `yourpassword` - Your PostgreSQL password
- `localhost` - Host (use your server IP for remote connections)
- `5432` - Default PostgreSQL port
- `gentech` - Database name

#### Create Database

```bash
# Using psql
createdb gentech

# Or connect to PostgreSQL and run:
# CREATE DATABASE gentech;
```

### 3. Initialize Prisma Schema

The schema is already provided in `prisma/schema.prisma` with models for:
- **Product**: Electronics with specs, images, pricing
- **Category**: Product categories
- **Enquiry**: Customer WhatsApp/Call inquiries
- **Settings**: Business configuration

### 4. Run Migrations

```bash
# Create and apply migrations
pnpm prisma migrate dev --name init

# Or if schema already exists:
pnpm prisma db push
```

### 5. Generate Prisma Client

```bash
pnpm prisma generate
```

### 6. Verify Setup

```bash
# Open Prisma Studio to view database
pnpm prisma studio
```

## API Routes Overview

### Products
- **GET** `/api/products` - Fetch all products with filtering
  - Query params: `category`, `featured`, `hotDeal`, `limit`
- **POST** `/api/products` - Create a new product
- **PATCH** `/api/products/[id]` - Update product
- **DELETE** `/api/products/[id]` - Delete product

### Enquiries
- **GET** `/api/enquiries` - Fetch all enquiries with pagination
  - Query params: `limit`, `skip`
- **POST** `/api/enquiries` - Create a new enquiry

## Database Schema

### Products Table
```
id: String (CUID, primary key)
name: String
slug: String (unique)
categoryId: String (foreign key)
price: Float
originalPrice: Float (nullable)
description: Text
specs: Json (default {})
images: String[] (array)
whatsappMessage: Text (nullable)
isFeatured: Boolean (default false)
isHotDeal: Boolean (default false)
hotDealExpiresAt: DateTime (nullable)
isActive: Boolean (default true)
location: String
clickCount: Int (default 0)
createdAt: DateTime
updatedAt: DateTime
```

### Enquiries Table
```
id: String (CUID, primary key)
enquiryType: String ('whatsapp' or 'call')
productId: String (foreign key, nullable)
productName: String (nullable)
productPrice: Float (nullable)
metadata: Json (default {})
createdAt: DateTime
```

### Categories Table
```
id: String (CUID, primary key)
name: String (unique)
slug: String (unique)
description: Text (nullable)
icon: Text (nullable)
isEnabled: Boolean (default true)
sortOrder: Int (default 0)
createdAt: DateTime
updatedAt: DateTime
```

### Settings Table
```
id: String (CUID, primary key)
phone: String
whatsapp: String
email: String
address: String
businessHours: String
city: String (nullable)
street: String (nullable)
building: String (nullable)
roomNumber: String (nullable)
socialFacebook: Text (nullable)
socialInstagram: Text (nullable)
socialTiktok: Text (nullable)
socialYoutube: Text (nullable)
heroBackgroundImage: Text (nullable)
createdAt: DateTime
updatedAt: DateTime
```

## Frontend Integration

### Updated Files
1. **ProductForm.tsx** - Now POST to `/api/products`
2. **admin/products/page.tsx** - Fetches from `/api/products`
3. **admin/enquiries/page.tsx** - Fetches from `/api/enquiries`

### Data Flow
```
Frontend Form
    ↓
POST /api/products (or PATCH/DELETE)
    ↓
Prisma Client
    ↓
PostgreSQL Database
    ↓
Response to Frontend
```

## Common Commands

```bash
# View database in Prisma Studio
pnpm prisma studio

# Create a new migration
pnpm prisma migrate dev --name <migration_name>

# Reset database (⚠️ deletes all data)
pnpm prisma migrate reset

# Generate Prisma client after schema changes
pnpm prisma generate

# Check migration status
pnpm prisma migrate status
```

## Troubleshooting

### Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running
```bash
# macOS with Homebrew
brew services start postgresql

# Ubuntu/Linux
sudo systemctl start postgresql

# Or start manually
postgres -D /usr/local/var/postgres
```

### Migration Conflicts
```bash
# Reset and start fresh (⚠️ loses all data)
pnpm prisma migrate reset
```

### Port Already in Use
Default PostgreSQL port 5432. If in use, either:
1. Stop the other service
2. Or use a different port in DATABASE_URL

## Environment Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `gentech` created
- [ ] `.env` file configured with DATABASE_URL
- [ ] Dependencies installed (`pnpm install`)
- [ ] Migrations applied (`pnpm prisma migrate dev`)
- [ ] Prisma client generated (`pnpm prisma generate`)
- [ ] API routes tested in Postman/Thunder Client
- [ ] Frontend pages updated and tested

## Next Steps

1. Test API routes with sample data
2. Verify product creation/edit/delete flows
3. Test enquiry submission and retrieval
4. Set up database backups
5. Configure production DATABASE_URL for deployment
