import { Request, Response } from 'express'
import { sendApiResponse } from '../../../utils/apiResponse';
import { createUserService } from './users.service';

// Create a new user
const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, contactNo, address, profileImg } = req.body;
    const newUser = await createUserService({ name, email, password, role, contactNo, address, profileImg });
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully.",
      data: newUser
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `${(error as Error).message}`
    });
  }
};


export const userController = {
  createUserController
}