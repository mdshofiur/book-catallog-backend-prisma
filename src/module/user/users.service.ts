import { User } from '@prisma/client';
import { UserData } from '../../../types/user.type';
import prisma from '../../../lib/prisma-connect';


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
    throw error;
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


/* -------------------------------------------------------------------------- */
/*                             Get user by id                                */
/* -------------------------------------------------------------------------- */

export const getUserByIdService = async (userId:string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    throw new Error('An error occurred while getting the user.');
  }
};


/* -------------------------------------------------------------------------- */
/*                             Update user by id                             */
/* -------------------------------------------------------------------------- */
export const updateUserByIdService = async (userId: string, userData: UserData) => {
  try {
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
   return updatedUser;
  } catch (error) {
    throw new Error('An error occurred while updating the user.');
  }
};

/* -------------------------------------------------------------------------- */
/*                             Delete user by id                             */
/* -------------------------------------------------------------------------- */

export const deleteUserService = async (userId: string) => {
  try {
    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    throw new Error('An error occurred while deleting the user.');
  }
};


/* -------------------------------------------------------------------------- */
/*                        Get User Profile Data Service                       */
/* -------------------------------------------------------------------------- */

export const getUserProfileDataService = async (userId: string) => {
  try {
    const userProfileData = await prisma.user.findUnique({
      where: { id: userId }
    });
    return userProfileData;
  } catch (error) {
    throw new Error('An error occurred while getting the user profile data.');
  }
}