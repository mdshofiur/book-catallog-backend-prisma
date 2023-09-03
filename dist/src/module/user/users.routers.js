"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const currentUser_1 = require("../../middleware/currentUser");
const UserRouters = express_1.default.Router();
// Create a new user
UserRouters.post('/signup', users_controller_1.userController.createUserController);
// Sign in user
UserRouters.post('/signin', users_controller_1.userController.SignInController);
UserRouters.get('/users', authMiddleware_1.default, users_controller_1.userController.getAllUsersController);
UserRouters.get('/users/:id', authMiddleware_1.default, users_controller_1.userController.getSingleUserController);
UserRouters.put('/users/:id', authMiddleware_1.default, users_controller_1.userController.updateUserController);
UserRouters.delete('/users/:id', authMiddleware_1.default, users_controller_1.userController.deleteUserController);
UserRouters.get('/profile', currentUser_1.CurrentUser, users_controller_1.userController.getUserProfileDataController);
exports.default = UserRouters;
