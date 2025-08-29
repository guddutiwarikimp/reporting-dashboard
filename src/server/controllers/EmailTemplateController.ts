import type { BackendContext, ApiResponse, PaginatedResponse, EmailTemplate } from '@/types';

export default class EmailTemplateController {
  // Create a new email template
  static async create(
    input: { name: string; subject: string; content: string },
    ctx: BackendContext
  ): Promise<ApiResponse<EmailTemplate>> {
    try {
      if (!ctx.orgId || !ctx.userId) {
        throw new Error('Organization ID and User ID are required');
      }

      const template = await ctx.db.emailTemplate.create({
        data: {
          name: input.name,
          subject: input.subject,
          content: input.content,
          orgId: ctx.orgId,
          createdBy: ctx.userId,
        },
        include: {
          organization: true,
          creator: true,
        },
      });

      return {
        success: true,
        data: template as EmailTemplate,
        message: 'Email template created successfully',
      };
    } catch (error: any) {
      console.error('Error creating email template:', error);
      return {
        success: false,
        message: error.message || 'Failed to create email template',
      };
    }
  }

  // Get a single email template by ID
  static async show(
    templateId: number,
    ctx: BackendContext
  ): Promise<ApiResponse<EmailTemplate>> {
    try {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      const template = await ctx.db.emailTemplate.findUnique({
        where: {
          id: templateId,
          orgId: ctx.orgId,
        },
        include: {
          organization: true,
          creator: true,
        },
      });

      if (!template) {
        return {
          success: false,
          message: 'Email template not found',
        };
      }

      return {
        success: true,
        data: template as EmailTemplate,
      };
    } catch (error: any) {
      console.error('Error fetching email template:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch email template',
      };
    }
  }

  // Get all email templates with pagination and filtering
  static async index(
    input: { limit?: number; cursor?: string; search?: string; isActive?: boolean },
    ctx: BackendContext
  ): Promise<ApiResponse<PaginatedResponse<EmailTemplate>>> {
    try {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      const { limit = 20, cursor, search, isActive } = input;

      // Build where clause
      const where: any = { orgId: ctx.orgId };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (isActive !== undefined) {
        where.isActive = isActive;
      }

      // Get total count
      const total = await ctx.db.emailTemplate.count({ where });

      // Get templates
      const templates = await ctx.db.emailTemplate.findMany({
        where,
        include: {
          organization: true,
          creator: true,
        },
        take: limit + 1,
        ...(cursor && { cursor: { id: parseInt(cursor) } }),
        orderBy: { createdAt: 'desc' },
      });

      let nextCursor: string | undefined = undefined;
      if (templates.length > limit) {
        const nextItem = templates.pop();
        nextCursor = nextItem?.id.toString();
      }

      return {
        success: true,
        data: {
          data: templates as EmailTemplate[],
          nextCursor,
          hasMore: !!nextCursor,
          total,
        },
      };
    } catch (error: any) {
      console.error('Error fetching email templates:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch email templates',
      };
    }
  }

  // Update an email template
  static async update(
    templateId: number,
    input: { name?: string; subject?: string; content?: string; isActive?: boolean },
    ctx: BackendContext
  ): Promise<ApiResponse<EmailTemplate>> {
    try {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      const updateData: any = {};
      if (input.name !== undefined) updateData.name = input.name;
      if (input.subject !== undefined) updateData.subject = input.subject;
      if (input.content !== undefined) updateData.content = input.content;
      if (input.isActive !== undefined) updateData.isActive = input.isActive;

      const template = await ctx.db.emailTemplate.update({
        where: {
          id: templateId,
          orgId: ctx.orgId,
        },
        data: updateData,
        include: {
          organization: true,
          creator: true,
        },
      });

      return {
        success: true,
        data: template as EmailTemplate,
        message: 'Email template updated successfully',
      };
    } catch (error: any) {
      console.error('Error updating email template:', error);
      return {
        success: false,
        message: error.message || 'Failed to update email template',
      };
    }
  }

  // Delete an email template
  static async delete(
    templateId: number,
    ctx: BackendContext
  ): Promise<ApiResponse<{ deleted: boolean }>> {
    try {
      if (!ctx.orgId) {
        throw new Error('Organization ID is required');
      }

      // Check if template is being used by any batch emails
      const batchEmailsUsingTemplate = await ctx.db.batchEmail.count({
        where: {
          templateId,
          orgId: ctx.orgId,
        },
      });

      if (batchEmailsUsingTemplate > 0) {
        return {
          success: false,
          message: 'Cannot delete template that is being used by batch emails',
        };
      }

      await ctx.db.emailTemplate.delete({
        where: {
          id: templateId,
          orgId: ctx.orgId,
        },
      });

      return {
        success: true,
        data: { deleted: true },
        message: 'Email template deleted successfully',
      };
    } catch (error: any) {
      console.error('Error deleting email template:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete email template',
      };
    }
  }

  // Duplicate an email template
  static async duplicate(
    templateId: number,
    newName: string,
    ctx: BackendContext
  ): Promise<ApiResponse<EmailTemplate>> {
    try {
      if (!ctx.orgId || !ctx.userId) {
        throw new Error('Organization ID and User ID are required');
      }

      // Get the original template
      const originalTemplate = await ctx.db.emailTemplate.findUnique({
        where: {
          id: templateId,
          orgId: ctx.orgId,
        },
      });

      if (!originalTemplate) {
        return {
          success: false,
          message: 'Email template not found',
        };
      }

      // Create a new template with the same content
      const newTemplate = await ctx.db.emailTemplate.create({
        data: {
          name: newName,
          subject: originalTemplate.subject,
          content: originalTemplate.content,
          orgId: ctx.orgId,
          createdBy: ctx.userId,
        },
        include: {
          organization: true,
          creator: true,
        },
      });

      return {
        success: true,
        data: newTemplate as EmailTemplate,
        message: 'Email template duplicated successfully',
      };
    } catch (error: any) {
      console.error('Error duplicating email template:', error);
      return {
        success: false,
        message: error.message || 'Failed to duplicate email template',
      };
    }
  }
}
