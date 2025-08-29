import { z } from 'zod';
import { protectedProcedure, adminProcedure, createTRPCRouter } from '@/server/api/trpc';
import EmailTemplateController from '@/server/controllers/EmailTemplateController';

export const emailTemplateRouter = createTRPCRouter({
  // Create a new email template
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
      subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
      content: z.string().min(1, 'Content is required'),
    }))
    .mutation(async ({ input, ctx }) => {
      return await EmailTemplateController.create(input, ctx);
    }),

  // Get a single email template by ID
  show: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input, ctx }) => {
      return await EmailTemplateController.show(input.id, ctx);
    }),

  // Get all email templates with pagination and filtering
  index: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
      search: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .query(async ({ input, ctx }) => {
      return await EmailTemplateController.index(input, ctx);
    }),

  // Update an email template
  update: protectedProcedure
    .input(z.object({
      id: z.number().int().positive(),
      updates: z.object({
        name: z.string().min(1).max(100).optional(),
        subject: z.string().min(1).max(200).optional(),
        content: z.string().min(1).optional(),
        isActive: z.boolean().optional(),
      }),
    }))
    .mutation(async ({ input, ctx }) => {
      return await EmailTemplateController.update(input.id, input.updates, ctx);
    }),

  // Delete an email template
  delete: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input, ctx }) => {
      return await EmailTemplateController.delete(input.id, ctx);
    }),

  // Duplicate an email template
  duplicate: protectedProcedure
    .input(z.object({
      id: z.number().int().positive(),
      newName: z.string().min(1, 'New name is required').max(100, 'Name must be less than 100 characters'),
    }))
    .mutation(async ({ input, ctx }) => {
      return await EmailTemplateController.duplicate(input.id, input.newName, ctx);
    }),

  // Get active email templates (for dropdowns)
  active: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const activeTemplates = await ctx.db.emailTemplate.findMany({
          where: { 
            orgId: ctx.orgId,
            isActive: true 
          },
          select: {
            id: true,
            name: true,
            subject: true,
          },
          orderBy: { name: 'asc' },
        });

        return {
          success: true,
          data: activeTemplates,
        };
      } catch (error: any) {
        console.error('Error fetching active email templates:', error);
        return {
          success: false,
          message: error.message || 'Failed to fetch active email templates',
        };
      }
    }),

  // Get email template statistics
  stats: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const [
          totalTemplates,
          activeTemplates,
          inactiveTemplates,
          templatesInUse,
        ] = await Promise.all([
          ctx.db.emailTemplate.count({ where: { orgId: ctx.orgId } }),
          ctx.db.emailTemplate.count({ where: { orgId: ctx.orgId, isActive: true } }),
          ctx.db.emailTemplate.count({ where: { orgId: ctx.orgId, isActive: false } }),
          ctx.db.batchEmail.count({ 
            where: { 
              orgId: ctx.orgId,
              templateId: { not: null }
            } 
          }),
        ]);

        return {
          success: true,
          data: {
            total: totalTemplates,
            active: activeTemplates,
            inactive: inactiveTemplates,
            inUse: templatesInUse,
          },
        };
      } catch (error: any) {
        console.error('Error fetching email template stats:', error);
        return {
          success: false,
          message: error.message || 'Failed to fetch email template statistics',
        };
      }
    }),

  // Search email templates
  search: protectedProcedure
    .input(z.object({
      query: z.string().min(1, 'Search query is required'),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input, ctx }) => {
      try {
        if (!ctx.orgId) {
          throw new Error('Organization ID is required');
        }

        const templates = await ctx.db.emailTemplate.findMany({
          where: {
            orgId: ctx.orgId,
            OR: [
              { name: { contains: input.query, mode: 'insensitive' } },
              { subject: { contains: input.query, mode: 'insensitive' } },
              { content: { contains: input.query, mode: 'insensitive' } },
            ],
          },
          select: {
            id: true,
            name: true,
            subject: true,
            isActive: true,
            createdAt: true,
          },
          take: input.limit,
          orderBy: { name: 'asc' },
        });

        return {
          success: true,
          data: templates,
        };
      } catch (error: any) {
        console.error('Error searching email templates:', error);
        return {
          success: false,
          message: error.message || 'Failed to search email templates',
        };
      }
    }),
});
