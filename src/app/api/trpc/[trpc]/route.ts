import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createTRPCContext } from '@/server/api';

const handler = async (req: Request) => {
  const response = await fetchRequestHandler({
    allowBatching: true,
    endpoint: '/api/trpc',
    router: appRouter,
    allowMethodOverride: true,
    req,
    createContext: async () =>
      createTRPCContext({
        session: null, // TODO: Add Supabase auth integration
        headers: req.headers,
        req,
      }),
    onError({ error, path }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        console.error(`Something went wrong in ${path}`, error?.message);
      }
    },
  });

  return response;
};

export { handler as GET, handler as POST };
