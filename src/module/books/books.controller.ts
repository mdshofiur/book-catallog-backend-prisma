import { Request, Response } from 'express';
import { booksService } from './books.service';
import { sendApiResponse } from '../../../utils/apiResponse';


/* -------------------------------------------------------------------------- */
/*                           Create book controller                           */
/* -------------------------------------------------------------------------- */

const createBookController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, genre, price, publicationDate, categoryId } = req.body;
        const newBook = await booksService.createBookService({title, author, genre, price, publicationDate, categoryId});
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Book created successfully',
            data: newBook,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while creating the book. ${(error as Error).message}`,
        });
    }
};


/* -------------------------------------------------------------------------- */
/*                           Get all books controller                         */
/* -------------------------------------------------------------------------- */

export const getAllBooksController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, size = 10, sortBy = 'title', sortOrder = 'asc', minPrice, maxPrice, category, search } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedSize = parseInt(size as string, 10);

    // Check if minPrice and maxPrice are valid numbers, otherwise set them to undefined
    const parsedMinPrice = !isNaN(parseFloat(minPrice as string)) ? parseFloat(minPrice as string) : undefined;
    const parsedMaxPrice = !isNaN(parseFloat(maxPrice as string)) ? parseFloat(maxPrice as string) : undefined;

    const books = await booksService.getAllBooksService(
      parsedPage,
      parsedSize,
      sortBy as string,
      sortOrder as 'asc' | 'desc',
      parsedMinPrice,
      parsedMaxPrice,
      category as string | undefined,
      search as string | undefined
    );

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ success: false, statusCode: 500, message: 'Internal server error' });
  }
};


/* -------------------------------------------------------------------------- */
/*                     Get Books by category id controller                    */
/* -------------------------------------------------------------------------- */

const getBooksByCategoryIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params;
        const books = await booksService.getBooksByCategoryIdService(categoryId);
        sendApiResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error) {
        sendApiResponse(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while retrieving the books. ${(error as Error).message}`,
        });
    }
}


export const booksController = { 
    createBookController,
    getAllBooksController,
    getBooksByCategoryIdController
}