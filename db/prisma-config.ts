import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connect = () => {
  return prisma;
};

export const disconnect = () => {
  return prisma.$disconnect();
};


// npx prisma migrate dev

// npx prisma generate

// npx prisma studio

// npm run postinstall



// npx prisma migrate reset --preview-feature

// npx prisma migrate dev --name init


// npx prisma migrate dev --name init --preview-feature


// npx prisma migrate dev --name init --preview-feature