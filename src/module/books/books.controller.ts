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

async function getBooksByCategoryIdController(req: Request, res: Response) {
  const categoryId = req.params.categoryId!;
  const page = parseInt(req.query.page as string) || 1; 
  const size = parseInt(req.query.size as string) || 10; 

  const result = await booksService.getBooksByCategoryIdService(categoryId, page, size);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode || 500).json({
      success: false,
      message: result.message || 'Internal server error',
    });
  }
}


/* -------------------------------------------------------------------------- */
/*                               Get Book by id                               */
/* -------------------------------------------------------------------------- */

const getBookByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const book = await booksService.getBookByIdService(bookId);
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `An error occurred while fetching the book. ${(error as Error).message}`,
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

const updateBookByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const bookData = req.body;
    const updatedBook = await booksService.updateBookByIdService(bookId, bookData);
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `An error occurred while updating the book. ${(error as Error).message}`,
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                        delete book by id controller                        */
/* -------------------------------------------------------------------------- */

const deleteBookByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await booksService.deleteBookByIdService(bookId);
    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    sendApiResponse(res, {
      success: false,
      statusCode: 500,
      message: `An error occurred while deleting the book. ${(error as Error).message}`,
    });
  }
}


export const booksController = { 
    createBookController,
    getAllBooksController,
    getBooksByCategoryIdController,
    getBookByIdController,
    updateBookByIdController,
    deleteBookByIdController,

}