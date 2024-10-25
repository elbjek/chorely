import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient;
}

// Prevents multiple instances of Prisma Client in development
const prisma = globalThis.prismaClient || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prismaClient = prisma;
}

export default prisma;
