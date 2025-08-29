import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { logEmail, updateStatus, getLogs, getTemplateAnalytics, bulkLog } from '@/server/services/EmailLoggingService';
import type { EmailStatus } from '@/types/backend';

export const emailLogRouter = createTRPCRouter({
  // Create a new email log entry
  create: protectedProcedure
    .input(z.object({
      templateId: z.string(),
      email: z.string().email(),
      subject: z.string(),
      status: z.string(),
      metadata: z.any().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const log = await logEmail({
          templateId: input.templateId,
          email: input.email,
          subject: input.subject,
          status: input.status as EmailStatus,
          metadata: input.metadata,
          orgId: ctx.orgId,
          createdBy: ctx.userId || undefined,
        });

        if (log) {
          return { success: true, data: log };
        } else {
          return { success: false, message: 'Failed to create email log' };
        }
      } catch (error: any) {
        console.error('Error creating email log:', error);
        return { success: false, message: error.message || 'Failed to create email log' };
      }
    }),

  // Get email logs with filtering and pagination
  getLogs: protectedProcedure
    .input(z.object({
      templateId: z.string().optional(),
      email: z.string().optional(),
      status: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const result = await getLogs(ctx, {
          ...input,
          status: input.status as EmailStatus | undefined,
          orgId: ctx.orgId,
        });
        return { success: true, data: result };
      } catch (error: any) {
        console.error('Error getting email logs:', error);
        return { success: false, message: error.message || 'Failed to get email logs' };
      }
    }),

  // Update email log status
  updateStatus: protectedProcedure
    .input(z.object({
      templateId: z.string(),
      email: z.string().email(),
      status: z.string(),
      additionalData: z.any().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const result = await updateStatus(
          input.templateId,
          input.email,
          ctx.orgId,
          input.status as EmailStatus,
          input.additionalData
        );

        if (result) {
          return { success: true, data: result };
        } else {
          return { success: false, message: 'Email log not found' };
        }
      } catch (error: any) {
        console.error('Error updating email status:', error);
        return { success: false, message: error.message || 'Failed to update email status' };
      }
    }),

  // Get email analytics for a template
  getAnalytics: protectedProcedure
    .input(z.object({
      templateId: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const analytics = await getTemplateAnalytics(
          input.templateId,
          ctx.orgId
        );

        if (analytics) {
          return { success: true, data: analytics };
        } else {
          return { success: false, message: 'Failed to get analytics' };
        }
      } catch (error: any) {
        console.error('Error getting email analytics:', error);
        return { success: false, message: error.message || 'Failed to get analytics' };
      }
    }),

  // Bulk log multiple emails
  bulkLog: protectedProcedure
    .input(z.object({
      emails: z.array(z.object({
        templateId: z.string(),
        email: z.string().email(),
        subject: z.string(),
        status: z.string(),
        metadata: z.any().optional(),
      })),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const logData = input.emails.map(email => ({
          ...email,
          status: email.status as EmailStatus,
          orgId: ctx.orgId!,
          createdBy: ctx.userId || undefined,
        }));

        const result = await bulkLog(logData);
        return { success: true, data: result };
      } catch (error: any) {
        console.error('Error bulk logging emails:', error);
        return { success: false, message: error.message || 'Failed to bulk log emails' };
      }
    }),
});
