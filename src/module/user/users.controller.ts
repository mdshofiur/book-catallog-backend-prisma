import { Request, Response } from 'express'
import { sendApiResponse } from '../../../utils/apiResponse';
import { authenticateUserService, createUserService } from './users.service';
import { generateAuthToken } from '../../../utils/authUtils';

/* -------------------------------------------------------------------------- */
/*                              Create a new user                             */
/* -------------------------------------------------------------------------- */
const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, contactNo, address, profileImg } = req.body;
    const newUser = await createUserService({ name, email, password, role, contactNo, address, profileImg });
    const newUserWithoutPassword = _.omit(newUser, 'password');
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully.",
      data: newUserWithoutPassword
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `${(error as Error).message}`
    });
  }
};


/* -------------------------------------------------------------------------- */
/*                                Sign in user                                */
/* -------------------------------------------------------------------------- */


const SignInController = async (req: Request, res: Response): Promise<void> => { 
  try {
    const { email, password } = req.body;
    const user = await authenticateUserService(email, password);
    if (!user) {
      return sendApiResponse(res, { success: false, statusCode: 401, error: 'Authentication failed', message: 'Authentication failed' });
    }
    // Generate a JWT token
    const token = generateAuthToken(user);
    // Send the token in the response
    sendApiResponse(res, { 
      success: true,
      statusCode: 200,
      message: "User signed in successfully!",
      data: { token }
    })
  } catch (error) {
    console.error('Error signing in:', error);
    sendApiResponse(res, { success: false, statusCode: 401, error: 'Authentication failed', message: 'Authentication failed' });
  }
}



export const userController = {
  createUserController,
  SignInController
}