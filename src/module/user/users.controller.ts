import { Request, Response } from "express";
import { sendApiResponse } from "../../../utils/apiResponse";
import { authenticateUserService, createUserService, getAllUsersService } from "./users.service";
import { generateAuthToken } from "../../../utils/authUtils";
import _ from "lodash";

/* -------------------------------------------------------------------------- */
/*                              Create a new user                             */
/* -------------------------------------------------------------------------- */
const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role, contactNo, address, profileImg } =
      req.body;
    const newUser = await createUserService({
      name,
      email,
      password,
      role,
      contactNo,
      address,
      profileImg,
    });
    const newUserWithoutPassword = _.omit(newUser, "password");
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully.",
      data: newUserWithoutPassword,
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `${(error as Error).message}`,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Sign in user                                */
/* -------------------------------------------------------------------------- */

type UserType = {
  userId: string;
  role: string;
  success: boolean;
};

const SignInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: UserType = await authenticateUserService(email, password);
    // If authentication fails, throw an error
    if (user.success === false) {
      throw new Error("Authentication failed");
    }
    // Generate a JWT token
    const token = generateAuthToken(user);
    res.setHeader("Authorization", `Bearer ${token}`);
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "User signed in successfully!",
      token: token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    sendApiResponse(res, {
      success: false,
      statusCode: 401,
      error: `${(error as Error).message}`
    });
  }
};



/* -------------------------------------------------------------------------- */
/*                                Get All Users                               */
/* -------------------------------------------------------------------------- */

const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService()
    const usersWithoutPasswords = users.map(user => _.omit(user, 'password'));
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users fetched successfully!",
      data: usersWithoutPasswords,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      error: `${(error as Error).message}`
    });
  }
}


export const userController = {
  createUserController,
  SignInController,
  getAllUsersController
};
