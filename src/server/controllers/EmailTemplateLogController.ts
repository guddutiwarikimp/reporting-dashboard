import prisma from '../../lib/prisma';
import { CTX } from '../../types/backend';

export interface EmailLogData {
  templateId: string;
  email: string;
  subject: string;
  status: EmailStatus;
  metadata?: {
    recipientInfo?: {
      leadId?: number;
      leadName?: string;
      leadEmail?: string;
    };
    campaignData?: {
      campaignId?: string;
      campaignName?: string;
    };
    emailData?: {
      threadId?: string;
      replyTo?: string;
      cc?: string[];
      bcc?: string[];
    };
    gmailData?: {
      messageId?: string;
      threadId?: string;
      labelIds?: string[];
    };
    performanceData?: {
      sentAt?: Date;
      deliveredAt?: Date;
      openedAt?: Date;
      clickedAt?: Date;
      bouncedAt?: Date;
      failedAt?: Date;
    };
    errorDetails?: {
      errorCode?: string;
      errorMessage?: string;
      retryCount?: number;
    };
  };
  orgId: number;
  createdBy?: number;
}

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

export default class EmailTemplateLogController {
  /**
   * Creates a new email log entry
   */
  static async createLog(logData: EmailLogData) {
    try {
      const log = await prisma.emailTemplateLog.create({
        data: {
          templateId: logData.templateId,
          email: logData.email,
          subject: logData.subject,
          status: logData.status,
          metadata: logData.metadata || {},
          orgId: logData.orgId,
          createdBy: logData.createdBy,
        },
        include: {
          template: true,
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // Update template stats
      await this.updateTemplateStats(logData.templateId, logData.status);

      return log;
    } catch (error) {
      console.error('Error creating email log:', error);
      throw new Error('Failed to create email log');
    }
  }

  /**
   * Updates email log status
   */
  static async updateLogStatus(
    logId: string, 
    status: EmailStatus, 
    additionalData?: Partial<EmailLogData['metadata']>
  ) {
    try {
      const updateData: any = { status };

      // Update timestamp based on status
      switch (status) {
        case 'sent':
          updateData.sentAt = new Date();
          break;
        case 'delivered':
          updateData.openedAt = new Date();
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

      // Update metadata if provided
      if (additionalData) {
        const log = await prisma.emailTemplateLog.findUnique({
          where: { id: logId },
          select: { metadata: true },
        });

        const currentMetadata = log?.metadata || {};
        updateData.metadata = { ...currentMetadata, ...additionalData };
      }

      const updatedLog = await prisma.emailTemplateLog.update({
        where: { id: logId },
        data: updateData,
        include: {
          template: true,
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // Update template stats
      await this.updateTemplateStats(updatedLog.templateId, status);

      return updatedLog;
    } catch (error) {
      console.error('Error updating email log status:', error);
      throw new Error('Failed to update email log status');
    }
  }

  /**
   * Updates template statistics based on email status
   */
  private static async updateTemplateStats(templateId: string, status: EmailStatus) {
    try {
      const updateData: any = {};

      switch (status) {
        case 'sent':
          updateData.sentCount = { increment: 1 };
          break;
        case 'opened':
          updateData.openCount = { increment: 1 };
          break;
        case 'clicked':
          updateData.clickCount = { increment: 1 };
          break;
        case 'replied':
          updateData.replyCount = { increment: 1 };
          break;
        case 'bounced':
          updateData.bounceCount = { increment: 1 };
          break;
        case 'unsubscribed':
          updateData.unsubscribeCount = { increment: 1 };
          break;
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.emailTemplate.update({
          where: { id: templateId },
          data: updateData,
        });
      }
    } catch (error) {
      console.error('Error updating template stats:', error);
    }
  }

  /**
   * Gets email logs by template ID
   */
  static async getLogsByTemplate(templateId: string, ctx: CTX, options?: {
    page?: number;
    limit?: number;
    status?: EmailStatus;
    startDate?: Date;
    endDate?: Date;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { page = 1, limit = 20, status, startDate, endDate } = options || {};
      const skip = (page - 1) * limit;

      const where: any = {
        templateId,
        orgId: ctx.orgId,
      };

      if (status) where.status = status;
      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const [logs, total] = await Promise.all([
        prisma.emailTemplateLog.findMany({
          where,
          include: {
            template: {
              select: {
                id: true,
                name: true,
                subject: true,
                templateType: true,
              },
            },
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { sentAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.emailTemplateLog.count({ where }),
      ]);

      return {
        logs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching email logs by template:', error);
      throw new Error('Failed to fetch email logs');
    }
  }

  /**
   * Gets email logs by organization with filtering
   */
  static async getLogsByOrganization(ctx: CTX, options?: {
    page?: number;
    limit?: number;
    status?: EmailStatus;
    templateId?: string;
    email?: string;
    startDate?: Date;
    endDate?: Date;
    createdBy?: number;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { 
        page = 1, 
        limit = 20, 
        status, 
        templateId, 
        email, 
        startDate, 
        endDate, 
        createdBy 
      } = options || {};

      const skip = (page - 1) * limit;

      const where: any = {
        orgId: ctx.orgId,
      };

      if (status) where.status = status;
      if (templateId) where.templateId = templateId;
      if (email) where.email = { contains: email, mode: 'insensitive' };
      if (createdBy) where.createdBy = createdBy;
      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const [logs, total] = await Promise.all([
        prisma.emailTemplateLog.findMany({
          where,
          include: {
            template: {
              select: {
                id: true,
                name: true,
                subject: true,
                templateType: true,
              },
            },
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { sentAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.emailTemplateLog.count({ where }),
      ]);

      return {
        logs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching organization email logs:', error);
      throw new Error('Failed to fetch email logs');
    }
  }

  /**
   * Gets email performance analytics for a template
   */
  static async getTemplateAnalytics(templateId: string, ctx: CTX, options?: {
    startDate?: Date;
    endDate?: Date;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { startDate, endDate } = options || {};
      const where: any = {
        templateId,
        orgId: ctx.orgId,
      };

      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const logs = await prisma.emailTemplateLog.findMany({
        where,
        select: {
          status: true,
          sentAt: true,
          openedAt: true,
          clickedAt: true,
          repliedAt: true,
          bouncedAt: true,
          failedAt: true,
        },
      });

      const totalSent = logs.length;
      const totalDelivered = logs.filter((log: any) => 
        ['delivered', 'opened', 'clicked', 'replied'].includes(log.status)
      ).length;
      const totalOpened = logs.filter((log: any) => log.openedAt).length;
      const totalClicked = logs.filter((log: any) => log.clickedAt).length;
      const totalReplied = logs.filter((log: any) => log.repliedAt).length;
      const totalBounced = logs.filter((log: any) => log.bouncedAt).length;
      const totalFailed = logs.filter((log: any) => log.failedAt).length;

      const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
      const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0;
      const replyRate = totalOpened > 0 ? (totalReplied / totalOpened) * 100 : 0;
      const bounceRate = totalSent > 0 ? (totalBounced / totalSent) * 100 : 0;
      const failureRate = totalSent > 0 ? (totalFailed / totalSent) * 100 : 0;

      return {
        totalSent,
        totalDelivered,
        totalOpened,
        totalClicked,
        totalReplied,
        totalBounced,
        totalFailed,
        openRate: Math.round(openRate * 100) / 100,
        clickRate: Math.round(clickRate * 100) / 100,
        replyRate: Math.round(replyRate * 100) / 100,
        bounceRate: Math.round(bounceRate * 100) / 100,
        failureRate: Math.round(failureRate * 100) / 100,
        deliveryRate: Math.round(((totalDelivered / totalSent) * 100) * 100) / 100,
      };
    } catch (error) {
      console.error('Error fetching template analytics:', error);
      throw new Error('Failed to fetch template analytics');
    }
  }

  /**
   * Gets organization-wide email analytics
   */
  static async getOrganizationAnalytics(ctx: CTX, options?: {
    startDate?: Date;
    endDate?: Date;
    templateId?: string;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { startDate, endDate, templateId } = options || {};
      const where: any = {
        orgId: ctx.orgId,
      };

      if (templateId) where.templateId = templateId;
      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const logs = await prisma.emailTemplateLog.findMany({
        where,
        select: {
          status: true,
          sentAt: true,
          openedAt: true,
          clickedAt: true,
          repliedAt: true,
          bouncedAt: true,
          failedAt: true,
          template: {
            select: {
              id: true,
              name: true,
              templateType: true,
            },
          },
        },
      });

      // Overall stats
      const totalSent = logs.length;
      const totalDelivered = logs.filter((log: any) => 
        ['delivered', 'opened', 'clicked', 'replied'].includes(log.status)
      ).length;
      const totalOpened = logs.filter((log: any) => log.openedAt).length;
      const totalClicked = logs.filter((log: any) => log.clickedAt).length;
      const totalReplied = logs.filter((log: any) => log.repliedAt).length;
      const totalBounced = logs.filter((log: any) => log.bouncedAt).length;
      const totalFailed = logs.filter((log: any) => log.failedAt).length;

      // Template performance
      const templateStats = logs.reduce((acc: Record<string, any>, log: any) => {
        const templateId = log.template.id;
        if (!acc[templateId]) {
          acc[templateId] = {
            templateId,
            templateName: log.template.name,
            templateType: log.template.templateType,
            sent: 0,
            opened: 0,
            clicked: 0,
            replied: 0,
            bounced: 0,
            failed: 0,
          };
        }

        acc[templateId].sent++;
        if (['delivered', 'opened', 'clicked', 'replied'].includes(log.status)) {
          acc[templateId].opened++;
        }
        if (log.clickedAt) acc[templateId].clicked++;
        if (log.repliedAt) acc[templateId].replied++;
        if (log.bouncedAt) acc[templateId].bounced++;
        if (log.failedAt) acc[templateId].failed++;

        return acc;
      }, {} as Record<string, any>);

      // Daily stats for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const dailyStats = logs
        .filter((log: any) => log.sentAt >= thirtyDaysAgo)
        .reduce((acc: Record<string, any>, log: any) => {
          const date = log.sentAt.toISOString().split('T')[0];
          if (!acc[date]) {
            acc[date] = { date, sent: 0, opened: 0, clicked: 0, replied: 0 };
          }
          acc[date].sent++;
          if (log.openedAt) acc[date].opened++;
          if (log.clickedAt) acc[date].clicked++;
          if (log.repliedAt) acc[date].replied++;
          return acc;
        }, {} as Record<string, any>);

      return {
        overall: {
          totalSent,
          totalDelivered,
          totalOpened,
          totalClicked,
          totalReplied,
          totalBounced,
          totalFailed,
          openRate: totalSent > 0 ? Math.round((totalOpened / totalSent) * 10000) / 100 : 0,
          clickRate: totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 10000) / 100 : 0,
          replyRate: totalOpened > 0 ? Math.round((totalReplied / totalOpened) * 10000) / 100 : 0,
          bounceRate: totalSent > 0 ? Math.round((totalBounced / totalSent) * 10000) / 100 : 0,
          failureRate: totalSent > 0 ? Math.round((totalFailed / totalSent) * 10000) / 100 : 0,
          deliveryRate: totalSent > 0 ? Math.round((totalDelivered / totalSent) * 10000) / 100 : 0,
        },
        templateStats: Object.values(templateStats),
        dailyStats: Object.values(dailyStats).sort((a: any, b: any) => a.date.localeCompare(b.date)),
      };
    } catch (error) {
      console.error('Error fetching organization analytics:', error);
      throw new Error('Failed to fetch organization analytics');
    }
  }

  /**
   * Gets email logs by lead email
   */
  static async getLogsByLeadEmail(email: string, ctx: CTX, options?: {
    page?: number;
    limit?: number;
    status?: EmailStatus;
    startDate?: Date;
    endDate?: Date;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { page = 1, limit = 20, status, startDate, endDate } = options || {};
      const skip = (page - 1) * limit;

      const where: any = {
        email: { contains: email, mode: 'insensitive' },
        orgId: ctx.orgId,
      };

      if (status) where.status = status;
      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const [logs, total] = await Promise.all([
        prisma.emailTemplateLog.findMany({
          where,
          include: {
            template: {
              select: {
                id: true,
                name: true,
                subject: true,
                templateType: true,
              },
            },
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { sentAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.emailTemplateLog.count({ where }),
      ]);

      return {
        logs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching lead email logs:', error);
      throw new Error('Failed to fetch lead email logs');
    }
  }

  /**
   * Deletes email logs (for cleanup purposes)
   */
  static async deleteOldLogs(ctx: CTX, options?: {
    olderThanDays?: number;
    status?: EmailStatus[];
    templateId?: string;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { olderThanDays = 90, status, templateId } = options || {};
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const where: any = {
        orgId: ctx.orgId,
        sentAt: { lt: cutoffDate },
      };

      if (status && status.length > 0) {
        where.status = { in: status };
      }

      if (templateId) {
        where.templateId = templateId;
      }

      const result = await prisma.emailTemplateLog.deleteMany({ where });

      return {
        success: true,
        deletedCount: result.count,
        message: `Deleted ${result.count} email logs older than ${olderThanDays} days`,
      };
    } catch (error) {
      console.error('Error deleting old email logs:', error);
      throw new Error('Failed to delete old email logs');
    }
  }

  /**
   * Gets email delivery status summary
   */
  static async getDeliveryStatusSummary(ctx: CTX, options?: {
    startDate?: Date;
    endDate?: Date;
    templateId?: string;
  }) {
    try {
      if (!ctx.orgId) throw new Error('Organization ID is required');

      const { startDate, endDate, templateId } = options || {};
      const where: any = {
        orgId: ctx.orgId,
      };

      if (templateId) where.templateId = templateId;
      if (startDate || endDate) {
        where.sentAt = {};
        if (startDate) where.sentAt.gte = startDate;
        if (endDate) where.sentAt.lte = endDate;
      }

      const statusCounts = await prisma.emailTemplateLog.groupBy({
        by: ['status'],
        where,
        _count: {
          status: true,
        },
      });

      const summary = statusCounts.reduce((acc: Record<string, number>, item: any) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {} as Record<string, number>);

      return summary;
    } catch (error) {
      console.error('Error fetching delivery status summary:', error);
      throw new Error('Failed to fetch delivery status summary');
    }
  }
}
