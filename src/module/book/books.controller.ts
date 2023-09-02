import { Request, Response } from 'express';
import { sendApiResponse } from '../../../utils/apiResponse';
import { booksService } from './books.service';


/* -------------------------------------------------------------------------- */
/*                    Create Controller for Create Category                   */
/* -------------------------------------------------------------------------- */
const createCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const newCategory = await booksService.createCategory(title);
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while creating the category. ${(error as Error).message}`,
        });
    }
};



/* -------------------------------------------------------------------------- */
/*                             Get all categories                             */
/* -------------------------------------------------------------------------- */

const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await booksService.getAllCategories();
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Categories fetched successfully',
            data: categories,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while fetching the categories. ${(error as Error).message}`,
        });
    }
}


/* -------------------------------------------------------------------------- */
/*                             Get single category                            */
/* -------------------------------------------------------------------------- */

const getSingleCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await booksService.getSingleCategory(id);
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Category fetched successfully',
            data: category,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while fetching the category. ${(error as Error).message}`,
        });
    }
}

/* -------------------------------------------------------------------------- */
/*                         Update Category Controller                         */
/* -------------------------------------------------------------------------- */

const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedCategory = await booksService.updateCategory(id, title);
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `Category not found`,
        });
    }
}


/* -------------------------------------------------------------------------- */
/*                         Delete Category Controller                         */
/* -------------------------------------------------------------------------- */

const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCategory = await booksService.deleteCategory(id);
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: 'Category not found'
        });
    }
}


export const booksController = {
    createCategoryController,
    getAllCategoriesController,
    getSingleCategoryController,
    updateCategoryController,
    deleteCategoryController
 }
