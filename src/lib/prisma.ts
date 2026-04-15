import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Prevent Prisma from crashing during static generation / build if DATABASE_URL is missing
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const hasDbUrl = !!process.env.DATABASE_URL;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
        // In some environments we might want to skip connection attempts during build
        ...(isBuild && !hasDbUrl ? { datasources: { db: { url: "postgresql://dummy:dummy@localhost:5432/dummy" } } } : {})
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
