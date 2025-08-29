import prisma from '../../lib/prisma';
import type { EmailStatus } from '@/types/backend';

/**
 * Comprehensive Email Logging Service
 * Handles all email logging operations including creation, updates, and analytics
 */

export interface EmailLogData {
  templateId: string;
  email: string;
  subject: string;
  status: EmailStatus;
  metadata?: any;
  orgId: number;
  createdBy?: number;
}

export interface EmailLogUpdateData {
  status: EmailStatus;
  additionalData?: any;
}

export interface EmailLogFilters {
  templateId?: string;
  email?: string;
  status?: EmailStatus;
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
  orgId?: number;
}

export interface EmailAnalytics {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  failed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  bounceRate: number;
  failureRate: number;
}

// Create a new email log entry
export async function logEmail(data: EmailLogData) {
  try {
    const logData: any = {
      templateId: data.templateId,
      email: data.email,
      subject: data.subject,
      status: data.status,
      metadata: data.metadata || {},
      orgId: data.orgId,
    };

    // Add timestamp based on status
    switch (data.status) {
      case 'sent':
        logData.sentAt = new Date();
        break;
      case 'delivered':
        logData.deliveredAt = new Date();
        break;
      case 'opened':
        logData.openedAt = new Date();
        break;
      case 'clicked':
        logData.clickedAt = new Date();
        break;
      case 'replied':
        logData.repliedAt = new Date();
        break;
      case 'bounced':
        logData.bouncedAt = new Date();
        break;
      case 'failed':
        logData.failedAt = new Date();
        break;
    }

    if (data.createdBy) {
      logData.createdBy = data.createdBy;
    }

    return await prisma.emailTemplateLog.create({
      data: logData,
    });
  } catch (error) {
    console.error('Error logging email:', error);
    throw new Error('Failed to log email');
  }
}

// Update email log status
export async function updateStatus(
  templateId: string,
  email: string,
  orgId: number,
  status: EmailStatus,
  additionalData?: any
) {
  try {
    const updateData: any = { status };

    // Update timestamp based on status
    switch (status) {
      case 'delivered':
        updateData.deliveredAt = new Date();
        break;
      case 'opened':
        updateData.openedAt = new Date();
        break;
      case 'clicked':
        updateData.clickedAt = new Date();
        break;
      case 'replied':
        updateData.repliedAt = new Date();
        break;
      case 'bounced':
        updateData.bouncedAt = new Date();
        break;
      case 'failed':
        updateData.failedAt = new Date();
        break;
    }

    // Add additional data to metadata
    if (additionalData) {
      updateData.metadata = additionalData;
    }

    const result = await prisma.emailTemplateLog.updateMany({
      where: {
        templateId,
        email,
        orgId,
      },
      data: updateData,
    });

    if (result.count === 0) {
      return null;
    }

    // Return the updated log
    return await prisma.emailTemplateLog.findFirst({
      where: {
        templateId,
        email,
        orgId,
      },
    });
  } catch (error) {
    console.error('Error updating email status:', error);
    throw new Error('Failed to update email status');
  }
}

// Get email logs with filtering and pagination
export async function getLogs(ctx: any, filters: EmailLogFilters) {
  try {
    const { limit = 20, offset = 0, orgId } = filters;
    const where: any = {};

    if (filters.templateId) where.templateId = filters.templateId;
    if (filters.email) where.email = { contains: filters.email, mode: 'insensitive' };
    if (filters.status) where.status = filters.status;
    if (filters.orgId) where.orgId = filters.orgId;
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [logs, total] = await Promise.all([
      prisma.emailTemplateLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.emailTemplateLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  } catch (error) {
    console.error('Error fetching email logs:', error);
    throw new Error('Failed to fetch email logs');
  }
}

// Get email analytics for a template
export async function getTemplateAnalytics(templateId: string, orgId: number) {
  try {
    const where = { templateId, orgId };

    const [total, sent, delivered, opened, clicked, replied, bounced, failed] = await Promise.all([
      prisma.emailTemplateLog.count({ where }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'sent' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'delivered' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'opened' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'clicked' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'replied' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'bounced' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'failed' } }),
    ]);

    return {
      total,
      sent,
      delivered,
      opened,
      clicked,
      replied,
      bounced,
      failed,
      deliveryRate: total > 0 ? (delivered / total) * 100 : 0,
      openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
      clickRate: opened > 0 ? (clicked / opened) * 100 : 0,
      replyRate: opened > 0 ? (replied / opened) * 100 : 0,
      bounceRate: total > 0 ? (bounced / total) * 100 : 0,
      failureRate: total > 0 ? (failed / total) * 100 : 0,
    };
  } catch (error) {
    console.error('Error fetching template analytics:', error);
    throw new Error('Failed to fetch template analytics');
  }
}

// Bulk log multiple emails
export async function bulkLog(emails: EmailLogData[]) {
  try {
    const results = await Promise.all(
      emails.map(email => logEmail(email))
    );
    return results;
  } catch (error) {
    console.error('Error bulk logging emails:', error);
    throw new Error('Failed to bulk log emails');
  }
}

// Legacy functions for backward compatibility
export async function logEmailSent(email: string, subject: string, templateId?: string, orgId?: number) {
  return logEmail({
    templateId: templateId || '',
    email,
    subject,
    status: 'sent',
    orgId: orgId || 0,
  });
}

export async function updateEmailStatus(emailId: string, status: string) {
  try {
    const updateData: any = { status };
    
    switch (status) {
      case 'delivered':
        updateData.deliveredAt = new Date();
        break;
      case 'opened':
        updateData.openedAt = new Date();
        break;
      case 'clicked':
        updateData.clickedAt = new Date();
        break;
      case 'bounced':
        updateData.bouncedAt = new Date();
        break;
    }

    return await prisma.emailTemplateLog.update({
      where: { id: emailId },
      data: updateData
    });
  } catch (error) {
    console.error('Error updating email status:', error);
    throw new Error('Failed to update email status');
  }
}

export async function getEmailLogs(options: {
  page?: number;
  limit?: number;
  status?: string;
  email?: string;
  orgId?: number;
}) {
  const { page = 1, limit = 20, status, email, orgId } = options;
  const offset = (page - 1) * limit;
  
  return getLogs({} as any, {
    limit,
    offset,
    status: status as EmailStatus | undefined,
    email,
    orgId,
  });
}

export async function getEmailLogById(id: string) {
  try {
    return await prisma.emailTemplateLog.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Error fetching email log:', error);
    throw new Error('Failed to fetch email log');
  }
}

export async function getEmailStats(orgId?: number) {
  try {
    const where: any = {};
    if (orgId) where.orgId = orgId;

    const [total, sent, delivered, opened, clicked, replied, bounced, failed] = await Promise.all([
      prisma.emailTemplateLog.count({ where }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'sent' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'delivered' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'opened' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'clicked' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'replied' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'bounced' } }),
      prisma.emailTemplateLog.count({ where: { ...where, status: 'failed' } }),
    ]);

    return {
      total,
      sent,
      delivered,
      opened,
      clicked,
      replied,
      bounced,
      failed,
      deliveryRate: total > 0 ? (delivered / total) * 100 : 0,
      openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
      clickRate: opened > 0 ? (clicked / opened) * 100 : 0,
      replyRate: opened > 0 ? (replied / opened) * 100 : 0,
      bounceRate: total > 0 ? (bounced / total) * 100 : 0,
      failureRate: total > 0 ? (failed / total) * 100 : 0,
    };
  } catch (error) {
    console.error('Error fetching email stats:', error);
    throw new Error('Failed to fetch email stats');
  }
}
