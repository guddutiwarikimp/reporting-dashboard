import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from './root';
import { appRouter } from './root';
import { createTRPCContext } from './trpc';

const createCaller = appRouter.createCaller;

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
