import express from 'express';
import { userController } from './users.controller';
import authenticate from '../../middleware/authMiddleware';
import { CurrentUser } from '../../middleware/currentUser';

const UserRouters = express.Router();

// Create a new user
UserRouters.post('/signup', userController.createUserController);

// Sign in user
UserRouters.post('/signin', userController.SignInController);

UserRouters.get('/users', authenticate, userController.getAllUsersController);

UserRouters.get('/users/:id', authenticate, userController.getSingleUserController);

UserRouters.put('/users/:id', authenticate, userController.updateUserController);

UserRouters.delete('/users/:id', authenticate, userController.deleteUserController);

UserRouters.get('/profile', CurrentUser, userController.getUserProfileDataController);


export default UserRouters;
