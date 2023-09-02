import { PrismaClient, User } from '@prisma/client';
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


// Define a type for the authentication result
type AuthenticationResult = {
  success: boolean;
  user: User | null;
};

export const authenticateUserService = async (
  email: string,
  password: string
): Promise<AuthenticationResult> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return { success: false, user: null}; // Authentication failed
    }
    return { success: true, user }; // Authentication successful
  } catch (error) {
    return { success: false, user: null }; 
  }
};

