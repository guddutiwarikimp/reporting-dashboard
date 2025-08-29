import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import EmailTemplateLogController from '../../controllers/EmailTemplateLogController';

// Define EmailStatus as a Zod enum for validation
const EmailStatusEnum = z.enum([
  'draft',
  'scheduled', 
  'queued',
  'sending',
  'sent',
  'delivered',
  'opened',
  'clicked',
  'replied',
  'bounced',
  'failed',
  'spam_reported',
  'unsubscribed'
]);

export const emailTemplateLogRouter = createTRPCRouter({
  // Get email logs by template
  getLogsByTemplate: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        status: EmailStatusEnum.optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getLogsByTemplate(
        input.templateId,
        ctx,
        {
          page: input.page,
          limit: input.limit,
          status: input.status,
          startDate: input.startDate,
          endDate: input.endDate,
        }
      );
    }),

  // Get email logs by organization with filtering
  getLogsByOrganization: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        status: EmailStatusEnum.optional(),
        templateId: z.string().optional(),
        email: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        createdBy: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getLogsByOrganization(ctx, {
        page: input.page,
        limit: input.limit,
        status: input.status,
        templateId: input.templateId,
        email: input.email,
        startDate: input.startDate,
        endDate: input.endDate,
        createdBy: input.createdBy,
      });
    }),

  // Get template analytics
  getTemplateAnalytics: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getTemplateAnalytics(
        input.templateId,
        ctx,
        {
          startDate: input.startDate,
          endDate: input.endDate,
        }
      );
    }),

  // Get organization-wide analytics
  getOrganizationAnalytics: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        templateId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getOrganizationAnalytics(ctx, {
        startDate: input.startDate,
        endDate: input.endDate,
        templateId: input.templateId,
      });
    }),

  // Get email logs by lead email
  getLogsByLeadEmail: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        status: EmailStatusEnum.optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getLogsByLeadEmail(
        input.email,
        ctx,
        {
          page: input.page,
          limit: input.limit,
          status: input.status,
          startDate: input.startDate,
          endDate: input.endDate,
        }
      );
    }),

  // Get delivery status summary
  getDeliveryStatusSummary: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        templateId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await EmailTemplateLogController.getDeliveryStatusSummary(ctx, {
        startDate: input.startDate,
        endDate: input.endDate,
        templateId: input.templateId,
      });
    }),

  // Delete old email logs (admin only)
  deleteOldLogs: protectedProcedure
    .input(
      z.object({
        olderThanDays: z.number().min(1).default(90),
        status: z.array(EmailStatusEnum).optional(),
        templateId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Check if user has admin privileges
      if (ctx.session?.appUser?.role !== 'ADMIN') {
        throw new Error('Insufficient permissions to delete email logs');
      }

      return await EmailTemplateLogController.deleteOldLogs(ctx, {
        olderThanDays: input.olderThanDays,
        status: input.status,
        templateId: input.templateId,
      });
    }),

  // Get email tracking for a specific email
  getEmailTracking: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        recipientEmail: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      return await EmailTemplateLogController.getLogsByOrganization(
        ctx,
        {
          templateId: input.templateId,
          email: input.recipientEmail,
          limit: 10,
        }
      );
    }),

  // Get email performance metrics
  getEmailPerformanceMetrics: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      return await EmailTemplateLogController.getTemplateAnalytics(
        input.templateId,
        ctx,
        {
          startDate: input.startDate,
          endDate: input.endDate,
        }
      );
    }),

  // Get email logs with advanced filtering
  getAdvancedEmailLogs: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        filters: z.object({
          status: z.array(EmailStatusEnum).optional(),
          templateIds: z.array(z.string()).optional(),
          emails: z.array(z.string()).optional(),
          dateRange: z.object({
            startDate: z.date().optional(),
            endDate: z.date().optional(),
          }).optional(),
          createdBy: z.array(z.number()).optional(),
          hasErrors: z.boolean().optional(),
          hasOpens: z.boolean().optional(),
          hasClicks: z.boolean().optional(),
          hasReplies: z.boolean().optional(),
        }).optional(),
        sortBy: z.enum(['sentAt', 'status', 'email', 'template']).default('sentAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, filters, sortBy, sortOrder } = input;
      const skip = (page - 1) * limit;

      // Build where clause based on filters
      const where: any = {
        orgId: ctx.orgId,
      };

      if (filters?.status && filters.status.length > 0) {
        where.status = { in: filters.status };
      }

      if (filters?.templateIds && filters.templateIds.length > 0) {
        where.templateId = { in: filters.templateIds };
      }

      if (filters?.emails && filters.emails.length > 0) {
        where.email = { in: filters.emails };
      }

      if (filters?.dateRange) {
        if (filters.dateRange.startDate || filters.dateRange.endDate) {
          where.sentAt = {};
          if (filters.dateRange.startDate) {
            where.sentAt.gte = filters.dateRange.startDate;
          }
          if (filters.dateRange.endDate) {
            where.sentAt.lte = filters.dateRange.endDate;
          }
        }
      }

      if (filters?.createdBy && filters.createdBy.length > 0) {
        where.createdBy = { in: filters.createdBy };
      }

      if (filters?.hasErrors === true) {
        where.OR = [
          { status: 'bounced' },
          { status: 'failed' },
          { status: 'spam_reported' },
        ];
      }

      if (filters?.hasOpens === true) {
        where.openedAt = { not: null };
      }

      if (filters?.hasClicks === true) {
        where.clickedAt = { not: null };
      }

      if (filters?.hasReplies === true) {
        where.repliedAt = { not: null };
      }

      // Build orderBy clause
      let orderBy: any = {};
      switch (sortBy) {
        case 'sentAt':
          orderBy.sentAt = sortOrder;
          break;
        case 'status':
          orderBy.status = sortOrder;
          break;
        case 'email':
          orderBy.email = sortOrder;
          break;
        case 'template':
          orderBy.template = { name: sortOrder };
          break;
        default:
          orderBy.sentAt = 'desc';
      }

      try {
        const [logs, total] = await Promise.all([
          ctx.db.emailTemplateLog.findMany({
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
            orderBy,
            skip,
            take: limit,
          }),
          ctx.db.emailTemplateLog.count({ where }),
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
        console.error('Error fetching advanced email logs:', error);
        throw new Error('Failed to fetch email logs');
      }
    }),

  // Export email logs to CSV
  exportEmailLogs: protectedProcedure
    .input(
      z.object({
        filters: z.object({
          status: z.array(EmailStatusEnum).optional(),
          templateIds: z.array(z.string()).optional(),
          emails: z.array(z.string()).optional(),
          dateRange: z.object({
            startDate: z.date().optional(),
            endDate: z.date().optional(),
          }).optional(),
          createdBy: z.array(z.number()).optional(),
        }).optional(),
        format: z.enum(['csv', 'json']).default('csv'),
      })
    )
    .query(async ({ input, ctx }) => {
      // Build where clause (similar to advanced filtering)
      const where: any = {
        orgId: ctx.orgId,
      };

      if (input.filters?.status && input.filters.status.length > 0) {
        where.status = { in: input.filters.status };
      }

      if (input.filters?.templateIds && input.filters.templateIds.length > 0) {
        where.templateId = { in: input.filters.templateIds };
      }

      if (input.filters?.emails && input.filters.emails.length > 0) {
        where.email = { in: input.filters.emails };
      }

      if (input.filters?.dateRange) {
        if (input.filters.dateRange.startDate || input.filters.dateRange.endDate) {
          where.sentAt = {};
          if (input.filters.dateRange.startDate) {
            where.sentAt.gte = input.filters.dateRange.startDate;
          }
          if (input.filters.dateRange.endDate) {
            where.sentAt.lte = input.filters.dateRange.endDate;
          }
        }
      }

      if (input.filters?.createdBy && input.filters.createdBy.length > 0) {
        where.createdBy = { in: input.filters.createdBy };
      }

      try {
        const logs = await ctx.db.emailTemplateLog.findMany({
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
        });

        if (input.format === 'csv') {
          // Convert to CSV format
          const csvHeaders = [
            'ID',
            'Template Name',
            'Template Type',
            'Recipient Email',
            'Subject',
            'Status',
            'Sent At',
            'Opened At',
            'Clicked At',
            'Replied At',
            'Bounced At',
            'Failed At',
            'Creator Name',
            'Creator Email',
            'Organization ID',
          ];

          const csvRows = logs.map((log: any) => [
            log.id,
            log.template.name,
            log.template.templateType,
            log.email,
            log.subject,
            log.status,
            log.sentAt?.toISOString() || '',
            log.openedAt?.toISOString() || '',
            log.clickedAt?.toISOString() || '',
            log.repliedAt?.toISOString() || '',
            log.bouncedAt?.toISOString() || '',
            log.failedAt?.toISOString() || '',
            `${log.creator?.firstName || ''} ${log.creator?.lastName || ''}`.trim(),
            log.creator?.email || '',
            log.orgId,
          ]);

          const csvContent = [csvHeaders, ...csvRows]
            .map(row => row.map((cell: any) => `"${cell}"`).join(','))
            .join('\n');

          return {
            format: 'csv',
            content: csvContent,
            filename: `email-logs-${new Date().toISOString().split('T')[0]}.csv`,
          };
        } else {
          // Return JSON format
          return {
            format: 'json',
            content: logs,
            filename: `email-logs-${new Date().toISOString().split('T')[0]}.json`,
          };
        }
      } catch (error) {
        console.error('Error exporting email logs:', error);
        throw new Error('Failed to export email logs');
      }
    }),
});
