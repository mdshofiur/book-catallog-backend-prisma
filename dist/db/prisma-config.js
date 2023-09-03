"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const connect = () => {
    return prisma;
};
exports.connect = connect;
const disconnect = () => {
    return prisma.$disconnect();
};
exports.disconnect = disconnect;
// npx prisma migrate dev
// npx prisma generate
// npx prisma studio
// npx prisma migrate reset --preview-feature
// npx prisma migrate dev --name init
// npx prisma migrate dev --name init --preview-feature
// npx prisma migrate dev --name init --preview-feature
