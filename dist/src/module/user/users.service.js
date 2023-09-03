"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileDataService = exports.deleteUserService = exports.updateUserByIdService = exports.getUserByIdService = exports.getAllUsersService = exports.authenticateUserService = exports.createUserService = void 0;
const prisma_connect_1 = __importDefault(require("../../../lib/prisma-connect"));
/* -------------------------------------------------------------------------- */
/*                          Create a new user Service                         */
/* -------------------------------------------------------------------------- */
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield prisma_connect_1.default.user.create({
            data: userData,
        });
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserService = createUserService;
const authenticateUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_connect_1.default.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return { success: false, user: null }; // Authentication failed
        }
        return { userId: user.id, role: user.role }; // Authentication successful
    }
    catch (error) {
        return { success: false, user: null };
    }
});
exports.authenticateUserService = authenticateUserService;
/* -------------------------------------------------------------------------- */
/*                             Get all users                                 */
/* -------------------------------------------------------------------------- */
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_connect_1.default.user.findMany();
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsersService = getAllUsersService;
/* -------------------------------------------------------------------------- */
/*                             Get user by id                                */
/* -------------------------------------------------------------------------- */
const getUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_connect_1.default.user.findUnique({ where: { id: userId } });
        return user;
    }
    catch (error) {
        throw new Error('An error occurred while getting the user.');
    }
});
exports.getUserByIdService = getUserByIdService;
/* -------------------------------------------------------------------------- */
/*                             Update user by id                             */
/* -------------------------------------------------------------------------- */
const updateUserByIdService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the user
        const updatedUser = yield prisma_connect_1.default.user.update({
            where: { id: userId },
            data: userData,
        });
        return updatedUser;
    }
    catch (error) {
        throw new Error('An error occurred while updating the user.');
    }
});
exports.updateUserByIdService = updateUserByIdService;
/* -------------------------------------------------------------------------- */
/*                             Delete user by id                             */
/* -------------------------------------------------------------------------- */
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete the user
        const deletedUser = yield prisma_connect_1.default.user.delete({
            where: { id: userId },
        });
        return deletedUser;
    }
    catch (error) {
        throw new Error('An error occurred while deleting the user.');
    }
});
exports.deleteUserService = deleteUserService;
/* -------------------------------------------------------------------------- */
/*                        Get User Profile Data Service                       */
/* -------------------------------------------------------------------------- */
const getUserProfileDataService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfileData = yield prisma_connect_1.default.user.findUnique({
            where: { id: userId }
        });
        return userProfileData;
    }
    catch (error) {
        throw new Error('An error occurred while getting the user profile data.');
    }
});
exports.getUserProfileDataService = getUserProfileDataService;
