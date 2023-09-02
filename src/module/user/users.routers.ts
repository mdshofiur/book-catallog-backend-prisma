import express from 'express';
import { userController } from './users.controller';

const UserRouters = express.Router();

// Create a new user
UserRouters.post('/signup', userController.createUserController);

// Sign in user
UserRouters.post('/signin', userController.SignInController);

UserRouters.get('/users', userController.getAllUsersController);


export default UserRouters;
