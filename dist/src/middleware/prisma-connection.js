"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePrismaConnection = exports.openPrismaConnection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const openPrismaConnection = (req, res, next) => {
    req.prisma = prisma;
    next();
};
exports.openPrismaConnection = openPrismaConnection;
const closePrismaConnection = () => {
    prisma.$disconnect();
};
exports.closePrismaConnection = closePrismaConnection;
