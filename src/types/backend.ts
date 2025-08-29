// Core backend types for EchartjsProject email template functionality

export type EmailStatus = 
  | 'draft' 
  | 'scheduled' 
  | 'queued' 
  | 'sending' 
  | 'sent' 
  | 'delivered' 
  | 'opened' 
  | 'clicked' 
  | 'replied' 
  | 'bounced' 
  | 'failed' 
  | 'spam_reported' 
  | 'unsubscribed';

export interface BackendContext {
  session: {
    supaUser: any;
    appUser: any;
  };
  db: any; // Prisma client
  orgId: number | null;
  userId: number | null;
  role: string | null;
}

// Type alias for backward compatibility
export type CTX = BackendContext;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
  total: number;
}

// User types
export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  phone?: string;
  role: string;
  status: string;
  supaId: string;
  orgId?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Organization types
export interface Organization {
  id: number;
  name: string;
  email: string;
  country: string;
  verifiedAt?: Date;
  timeZone?: string;
  industry?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  createdAt: Date;
  updatedAt: Date;
  logo?: string;
  brandColor?: string;
  slug?: string;
}

// Email Template types
export interface EmailTemplate {
  id: string;
  name: string;
  subject?: string;
  body: string;
  templateType: string;
  orgId: number;
  isPublic: boolean;
  createdByUserId: number;
  createdAt: Date;
  updatedAt: Date;
  sentCount: number;
  openCount: number;
  clickCount: number;
  replyCount: number;
  unsubscribeCount: number;
  bounceCount: number;
}

// Email Template Log types - tracks email usage and performance
export interface EmailTemplateLog {
  id: string;
  templateId: string;
  email: string;
  subject: string;
  status: string;
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  errorMessage?: string;
  metadata?: any;
  orgId: number;
  createdBy?: number;
}

// Input types for API operations
export interface CreateEmailTemplateInput {
  name: string;
  subject?: string;
  body: string;
  templateType?: string;
  isPublic?: boolean;
}

export interface UpdateEmailTemplateInput {
  name?: string;
  subject?: string;
  body?: string;
  templateType?: string;
  isPublic?: boolean;
}

// Email Template Log input types
export interface CreateEmailTemplateLogInput {
  templateId: string;
  email: string;
  subject: string;
  status: string;
  metadata?: any;
  orgId: number;
  createdBy?: number;
}

export interface UpdateEmailTemplateLogInput {
  status?: string;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  errorMessage?: string;
  metadata?: any;
}

// Get Email Template Logs input
export interface GetEmailTemplateLogsInput {
  limit?: number;
  cursor?: string;
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  templateId?: string;
}
