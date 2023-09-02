import express from 'express';
import { userController } from './users.controller';

const UserRouters = express.Router();

// Create a new user
UserRouters.post('/signup', userController.createUserController);


export default UserRouters;
