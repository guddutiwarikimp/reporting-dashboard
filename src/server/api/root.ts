import { createTRPCRouter } from './trpc';
import { emailTemplateLogRouter } from './router/emailTemplateLog';
import { emailLogRouter } from './router/emailLog';

export const appRouter = createTRPCRouter({
  emailTemplateLog: emailTemplateLogRouter,
  emailLog: emailLogRouter,
});

export type AppRouter = typeof appRouter;
