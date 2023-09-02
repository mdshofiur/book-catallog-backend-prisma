import { PrismaClient } from '@prisma/client';
import { UserData } from '../../types/user.type';

const prisma = new PrismaClient();

// Create a new user
export const createUserService = async (userData:UserData) => {
  try {
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    throw new Error('An error occurred while creating the user.');
  }
};
