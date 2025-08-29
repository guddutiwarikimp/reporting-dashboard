import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_PRISMA_URL + '&pgbouncer=true&prepared_statements=false',
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// Uncomment for query logging during development
// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });
