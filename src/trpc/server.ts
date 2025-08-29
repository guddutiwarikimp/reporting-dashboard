import { cache } from 'react';
import { headers } from 'next/headers';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import type { AppRouter } from '@/server/api';
import { createCaller, createTRPCContext } from '@/server/api';

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    session: null, // TODO: Add Supabase auth integration
    headers: heads,
    req: {} as any,
  });
});

const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller as any,
  cache(() => new (globalThis as any).QueryClient())
);
