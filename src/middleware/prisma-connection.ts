import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            prisma: PrismaClient;
        }
    }
}


const prisma = new PrismaClient();

export const openPrismaConnection = (
        req: CustomRequest,
        res: Response,
        next: NextFunction
) => {
    req.prisma = prisma;
    next();
};

interface CustomRequest extends Request {
    prisma: PrismaClient;
}


export const closePrismaConnection = () => {
    prisma.$disconnect();
  };
  