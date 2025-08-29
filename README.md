# EchartjsProject - Simple Email Log Management

A clean and simple email logging system with one Prisma model and basic API functions.

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env.local` file in your project root:

```bash
# Database Configuration
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/database"
SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/shadow_database"

# Node Environment
NODE_ENV="development"
```

### 2. Database Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name add-email-logging

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 3. Start Development Server
```bash
npm run dev
```

## 🏗️ Simple Architecture

### What You Get
- **One Prisma Model**: `EmailTemplateLog` for tracking emails
- **Simple Service**: Basic functions to capture and fetch logs
- **Clean API**: Just what you need for email log management

### Database Model
```prisma
model EmailTemplateLog {
  id          String   @id @default(uuid())
  email       String
  subject     String
  templateId  String?
  status      String   @default("sent") // sent, delivered, opened, clicked, bounced
  sentAt      DateTime @default(now())
  deliveredAt DateTime?
  openedAt    DateTime?
  clickedAt   DateTime?
  bouncedAt   DateTime?
  metadata    Json?    @default("{}")
  orgId       Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([email])
  @@index([status])
  @@index([orgId])
}
```

## 🔧 Simple API Functions

### 1. Log Email Sent
```typescript
import { logEmailSent } from '@/server/services/EmailLoggingService';

// When you send an email
await logEmailSent(
  'user@example.com',
  'Welcome to our service',
  'template-123',
  1 // orgId (optional)
);
```

### 2. Update Email Status
```typescript
import { updateEmailStatus } from '@/server/services/EmailLoggingService';

// When email is opened (via tracking pixel)
await updateEmailStatus('log-id-123', 'opened');

// When email is delivered
await updateEmailStatus('log-id-123', 'delivered');

// When email is clicked
await updateEmailStatus('log-id-123', 'clicked');

// When email bounces
await updateEmailStatus('log-id-123', 'bounced');
```

### 3. Get Email Logs
```typescript
import { getEmailLogs } from '@/server/services/EmailLoggingService';

// Get all logs
const { logs, pagination } = await getEmailLogs({
  page: 1,
  limit: 20
});

// Get only opened emails
const openedEmails = await getEmailLogs({
  status: 'opened'
});

// Get logs for specific organization
const orgLogs = await getEmailLogs({
  orgId: 1,
  page: 1,
  limit: 50
});
```

### 4. Get Email Statistics
```typescript
import { getEmailStats } from '@/server/services/EmailLoggingService';

// Get overall stats
const stats = await getEmailStats();

// Get stats for specific organization
const orgStats = await getEmailStats(1);

console.log(stats);
// {
//   total: 1000,
//   sent: 1000,
//   delivered: 950,
//   opened: 300,
//   clicked: 50,
//   bounced: 50,
//   deliveryRate: 95,
//   openRate: 31.58,
//   clickRate: 16.67,
//   bounceRate: 5
// }
```

## 📊 Usage Examples

### Basic Email Tracking
```typescript
// 1. Log when email is sent
const log = await logEmailSent(
  'customer@example.com',
  'Your order confirmation',
  'order-confirmation-template'
);

// 2. Update status when delivered
await updateEmailStatus(log.id, 'delivered');

// 3. Update status when opened
await updateEmailStatus(log.id, 'opened');

// 4. Update status when clicked
await updateEmailStatus(log.id, 'clicked');
```

### Get Performance Metrics
```typescript
// Get email performance for dashboard
const stats = await getEmailStats();

// Display metrics
console.log(`Delivery Rate: ${stats.deliveryRate.toFixed(1)}%`);
console.log(`Open Rate: ${stats.openRate.toFixed(1)}%`);
console.log(`Click Rate: ${stats.clickRate.toFixed(1)}%`);
console.log(`Bounce Rate: ${stats.bounceRate.toFixed(1)}%`);
```

## 🚀 Production Ready

### What's Included
- ✅ Simple Prisma model for email logging
- ✅ Basic functions to capture and fetch logs
- ✅ No complex routing or unnecessary services
- ✅ Clean, maintainable code
- ✅ Ready for immediate use

### Next Steps
1. **Run Migration**: `npx prisma migrate dev --name add-email-logging`
2. **Generate Client**: `npx prisma generate`
3. **Use the Functions**: Import and use the simple log functions
4. **Deploy**: Ready for production

## 🔒 Security Features

- **Input Validation**: All functions validate their inputs
- **Error Handling**: Comprehensive error handling without exposing sensitive data
- **Organization Isolation**: Support for multi-tenant logging with `orgId`
- **Type Safety**: Full TypeScript support

## 📈 Performance Features

- **Efficient Queries**: Optimized Prisma queries with proper indexing
- **Pagination**: Built-in pagination support for large datasets
- **Filtering**: Simple filtering by status, email, and organization
- **Statistics**: Fast aggregated statistics calculation

---

**That's it!** Simple, clean, and exactly what you asked for - one Prisma model and basic API functions for email log management. No complexity, just what you need to track emails effectively.
