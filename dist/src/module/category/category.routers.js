"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const CategoryRouters = express_1.default.Router();
CategoryRouters.post('/categories', authMiddleware_1.default, category_controller_1.categoryController.createCategoryController);
CategoryRouters.get('/categories', category_controller_1.categoryController.getAllCategoriesController);
CategoryRouters.get('/categories/:id', category_controller_1.categoryController.getSingleCategoryController);
CategoryRouters.put('/categories/:id', authMiddleware_1.default, category_controller_1.categoryController.updateCategoryController);
CategoryRouters.delete('/categories/:id', authMiddleware_1.default, category_controller_1.categoryController.deleteCategoryController);
exports.default = CategoryRouters;
