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
exports.userController = void 0;
const apiResponse_1 = require("../../../utils/apiResponse");
const users_service_1 = require("./users.service");
const authUtils_1 = require("../../../utils/authUtils");
const lodash_1 = __importDefault(require("lodash"));
/* -------------------------------------------------------------------------- */
/*                              Create a new user                             */
/* -------------------------------------------------------------------------- */
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role, contactNo, address, profileImg } = req.body;
        const newUser = yield (0, users_service_1.createUserService)({
            name,
            email,
            password,
            role,
            contactNo,
            address,
            profileImg,
        });
        const newUserWithoutPassword = lodash_1.default.omit(newUser, "password");
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User created successfully.",
            data: newUserWithoutPassword,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `${error.message}`,
        });
    }
});
const SignInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, users_service_1.authenticateUserService)(email, password);
        // If authentication fails, throw an error
        if (user.success === false) {
            throw new Error("Authentication failed");
        }
        // Generate a JWT token
        const token = (0, authUtils_1.generateAuthToken)(user);
        res.setHeader("Authorization", `Bearer ${token}`);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User signed in successfully!",
            token: token,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 401,
            error: `Something went wrong.`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                                Get All Users                               */
/* -------------------------------------------------------------------------- */
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_service_1.getAllUsersService)();
        const usersWithoutPasswords = users.map((user) => lodash_1.default.omit(user, "password"));
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Users fetched successfully!",
            data: usersWithoutPasswords,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            error: `${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                               Get Single User                              */
/* -------------------------------------------------------------------------- */
const getSingleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield (0, users_service_1.getUserByIdService)(userId);
        const userWithoutPassword = lodash_1.default.omit(user, "password");
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User fetched successfully!",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            error: `${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                           Update User Controller                           */
/* -------------------------------------------------------------------------- */
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body;
        // Update the user, omitting the 'password' field
        const updatedUser = lodash_1.default.omit(yield (0, users_service_1.updateUserByIdService)(userId, userData), "password");
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User updated successfully!",
            data: updatedUser,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: "User not found",
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                           Delete User Controller                           */
/* -------------------------------------------------------------------------- */
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const User = yield (0, users_service_1.deleteUserService)(userId);
        const updateUser = lodash_1.default.omit(User, "password");
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User deleted successfully!",
            data: updateUser,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: "User not found",
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                      Get User Profile Data Controller                      */
/* -------------------------------------------------------------------------- */
const getUserProfileDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const userProfileData = yield (0, users_service_1.getUserProfileDataService)(user.userId);
        const emitPassword = lodash_1.default.omit(userProfileData, "password");
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User profile data fetched successfully!",
            data: emitPassword,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: "User not found",
        });
    }
});
exports.userController = {
    createUserController,
    SignInController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteUserController,
    getUserProfileDataController
};
