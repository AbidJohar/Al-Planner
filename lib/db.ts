// lib/db.ts
import {PrismaClient} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Temporary debug logging
if (process.env.NODE_ENV === "production") {
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
  console.log("DATABASE_URL starts with postgresql:", process.env.DATABASE_URL?.startsWith("postgresql://"));
}

export const db = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "production" ? ["error"] : undefined,
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}