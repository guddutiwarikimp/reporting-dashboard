import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import SuperJSON from 'superjson';
import prisma from '@/lib/prisma';
import type { BackendContext } from '@/types';

// Context creation with authentication
export const createTRPCContext = async (opts: {
  session: any;
  headers: Headers;
  req: any;
}): Promise<BackendContext> => {
  try {
    // For now, we'll create a mock context
    // In production, this would validate the session and fetch user data
    const existingUser = opts.session?.data?.user ? await prisma.user.findUnique({
      where: { supaId: opts.session.data.user.id },
      include: { organization: { select: { id: true, name: true, slug: true } } },
    }) : null;

    return {
      session: { 
        supaUser: opts.session?.data?.user, 
        appUser: existingUser 
      },
      db: prisma,
      orgId: existingUser?.orgId || 1, // Hardcoded for testing
      userId: existingUser?.id || 1, // Hardcoded for testing
      role: existingUser?.role || 'ADMIN', // Hardcoded for testing
    };
  } catch (error) {
    console.error('Error creating tRPC context:', error);
    return {
      session: { supaUser: null, appUser: null },
      db: prisma,
      orgId: 1, // Hardcoded for testing
      userId: 1, // Hardcoded for testing
      role: 'ADMIN', // Hardcoded for testing
    };
  }
};

// tRPC initialization
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

// Middleware for error logging
const errorLoggingMiddleware = t.middleware(async ({ path, next, ctx }) => {
  try {
    return await next({ ctx });
  } catch (error) {
    console.error(`Error in ${path}:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      context: { userId: ctx.userId, orgId: ctx.orgId },
    });
    throw error;
  }
});

// Middleware for authentication
const authMiddleware = t.middleware(async ({ ctx, next }) => {
  // if (!ctx.userId || !ctx.orgId) {
  //   throw new TRPCError({ 
  //     code: 'UNAUTHORIZED',
  //     message: 'User not authenticated or organization not found'
  //   });
  // }
  return next({ ctx });
});

// Middleware for role-based access control
const roleMiddleware = (allowedRoles: string[]) => 
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.role || !allowedRoles.includes(ctx.role)) {
      throw new TRPCError({ 
        code: 'FORBIDDEN',
        message: 'Insufficient permissions'
      });
    }
    return next({ ctx });
  });

// Procedure definitions
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure.use(errorLoggingMiddleware);
export const protectedProcedure = t.procedure
  .use(authMiddleware)
  .use(errorLoggingMiddleware);

// Role-based procedures
export const adminProcedure = protectedProcedure.use(roleMiddleware(['ADMIN', 'OWNER']));
export const ownerProcedure = protectedProcedure.use(roleMiddleware(['OWNER']));

// Export types
export type TRPCContext = typeof createTRPCContext;
export type TRPCRouter = typeof createTRPCRouter;
