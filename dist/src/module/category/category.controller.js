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
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const apiResponse_1 = require("../../../utils/apiResponse");
const category_service_1 = require("./category.service");
/* -------------------------------------------------------------------------- */
/*                    Create Controller for Create Category                   */
/* -------------------------------------------------------------------------- */
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const newCategory = yield category_service_1.categoryService.createCategory(title);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Category created successfully',
            data: newCategory,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while creating the category. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                             Get all categories                             */
/* -------------------------------------------------------------------------- */
const getAllCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_service_1.categoryService.getAllCategories();
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Categories fetched successfully',
            data: categories,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while fetching the categories. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                             Get single category                            */
/* -------------------------------------------------------------------------- */
const getSingleCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_service_1.categoryService.getSingleCategory(id);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Category fetched successfully',
            data: category,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while fetching the category. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                         Update Category Controller                         */
/* -------------------------------------------------------------------------- */
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedCategory = yield category_service_1.categoryService.updateCategory(id, title);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `Category not found`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                         Delete Category Controller                         */
/* -------------------------------------------------------------------------- */
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCategory = yield category_service_1.categoryService.deleteCategory(id);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: 'Category not found'
        });
    }
});
exports.categoryController = {
    createCategoryController,
    getAllCategoriesController,
    getSingleCategoryController,
    updateCategoryController,
    deleteCategoryController
};
