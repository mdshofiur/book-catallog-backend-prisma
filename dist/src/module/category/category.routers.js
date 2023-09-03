"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const CategoryRouters = express_1.default.Router();
CategoryRouters.post('/categories', category_controller_1.categoryController.createCategoryController);
CategoryRouters.get('/categories', category_controller_1.categoryController.getAllCategoriesController);
CategoryRouters.get('/categories/:id', category_controller_1.categoryController.getSingleCategoryController);
CategoryRouters.put('/categories/:id', category_controller_1.categoryController.updateCategoryController);
CategoryRouters.delete('/categories/:id', category_controller_1.categoryController.deleteCategoryController);
exports.default = CategoryRouters;
