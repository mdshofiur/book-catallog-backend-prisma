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
exports.categoryService = void 0;
const prisma_connect_1 = __importDefault(require("../../../lib/prisma-connect"));
/* -------------------------------------------------------------------------- */
/*                           Create category service                          */
/* -------------------------------------------------------------------------- */
const createCategory = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield prisma_connect_1.default.category.create({
            data: {
                title,
            },
        });
        return newCategory;
    }
    catch (error) {
        throw new Error("An error occurred while creating the category.");
    }
});
/* -------------------------------------------------------------------------- */
/*                           Get all categories service                       */
/* -------------------------------------------------------------------------- */
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma_connect_1.default.category.findMany();
        return categories;
    }
    catch (error) {
        throw new Error("An error occurred while fetching the categories.");
    }
});
/* -------------------------------------------------------------------------- */
/*                             Get Single Category                            */
/* -------------------------------------------------------------------------- */
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma_connect_1.default.category.findUnique({
            where: {
                id: id,
            },
        });
        return category;
    }
    catch (error) {
        throw new Error("An error occurred while fetching the category.");
    }
});
/* -------------------------------------------------------------------------- */
/*                           Update category service                          */
/* -------------------------------------------------------------------------- */
const updateCategory = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma_connect_1.default.category.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
        return category;
    }
    catch (error) {
        throw new Error("An error occurred while updating the category.");
    }
});
/* -------------------------------------------------------------------------- */
/*                         Delete Category Controller                         */
/* -------------------------------------------------------------------------- */
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma_connect_1.default.category.delete({
            where: {
                id: id,
            },
        });
        return category;
    }
    catch (error) {
        throw new Error("An error occurred while deleting the category.");
    }
});
exports.categoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};
