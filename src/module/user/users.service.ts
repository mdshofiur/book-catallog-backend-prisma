import { PrismaClient, User } from '@prisma/client';
import { UserData } from '../../types/user.type';

const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                          Create a new user Service                         */
/* -------------------------------------------------------------------------- */
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


/* -------------------------------------------------------------------------- */
/*                             Authenticate user                             */
/* -------------------------------------------------------------------------- */
type FailedResult = {
  success: boolean;
  user: User | null;
};


type SuccessResult = {
  userId: string;
  role: string;
}

export const authenticateUserService = async (
  email: string,
  password: string
): Promise<FailedResult | SuccessResult | any> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return { success: false, user: null}; // Authentication failed
    }
    return {userId: user.id, role: user.role }; // Authentication successful
  } catch (error) {
    return { success: false, user: null};
  }
};


/* -------------------------------------------------------------------------- */
/*                             Get all users                                 */
/* -------------------------------------------------------------------------- */

export const getAllUsersService = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error('An error occurred while getting the users.');
  }
};