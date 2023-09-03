import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma-connect';


/* -------------------------------------------------------------------------- */
/*                            Create books service                            */
/* -------------------------------------------------------------------------- */

 const createBookService = async (bookData: any) => {
  try {
    const newBook = await prisma.book.create({
      data: bookData,
      include: {
        category: true,
      },
    });
    return newBook;
  } catch (error) {
    throw new Error("An error occurred while creating the book.");
  }
};


/* -------------------------------------------------------------------------- */
/*                           Get all books service                            */
/* -------------------------------------------------------------------------- */

export const getAllBooksService = async (
  page: number,
  size: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  minPrice?: number, // Make minPrice optional
  maxPrice?: number, // Make maxPrice optional
  categoryId?: string | undefined,
  search?: string | undefined
) => {
  try {
    const skip = (page - 1) * size;
    const orderBy: Prisma.BookOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const where: Prisma.BookWhereInput = {};

    // Add filters only if they are provided
    if (minPrice !== undefined) {
      where.price = {
        gte: minPrice,
      };
    }

    if (maxPrice !== undefined) {
      if (where.price) {
        where.price = {
            lte: maxPrice,
        };
      } else {
        where.price = {
          lte: maxPrice,
        };
      }
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          genre: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const total = await prisma.book.count({ where }); 

    const data = await prisma.book.findMany({
      where,
      skip,
      take: size,
      orderBy,
    });

    const totalPage = Math.ceil(total / size);

    return {
      success: true,
      statusCode: 200,
      message: 'Books fetched successfully',
      meta: {
        page,
        size,
        total,
        totalPage,
      },
      data,
    };
  } catch (error) {
    throw new Error('Error fetching books');
  }
};


/* -------------------------------------------------------------------------- */
/*                      Get Books by category id service                      */
/* -------------------------------------------------------------------------- */

async function getBooksByCategoryIdService(categoryId:string, page:number, size:number) {
  try {
    // Calculate pagination offsets
    const skip = (page - 1) * size;

    // Fetch books by categoryId with pagination
    const books = await prisma.book.findMany({
      where: {
        categoryId: categoryId,
      },
      skip,
      take: size,
      include: {
        category: true,
      },
    });

    // Count the total number of books for pagination
    const total = await prisma.book.count({
      where: {
        categoryId: categoryId,
      },
    });

    const totalPages = Math.ceil(total / size);

    return {
      success: true,
      statusCode: 200,
      message: 'Books with associated category data fetched successfully',
      meta: {
        page,
        size,
        total,
        totalPage: totalPages,
      },
      data: books,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}


/* -------------------------------------------------------------------------- */
/*                           get book by id service                           */
/* -------------------------------------------------------------------------- */

const getBookByIdService = async (bookId: string) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      }
    });
    return book;
  } catch (error) {
    throw new Error('An error occurred while fetching the book.');
  }
}

/* -------------------------------------------------------------------------- */
/*                          Update book by id service                         */
/* -------------------------------------------------------------------------- */

const updateBookByIdService = async (bookId: string, bookData: any) => {
  try {
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: bookData,
    });
    return updatedBook;
  } catch (error) {
    throw new Error('An error occurred while updating the book.');
  }
}


/* -------------------------------------------------------------------------- */
/*                          delete book by id service                         */
/* -------------------------------------------------------------------------- */

const deleteBookByIdService = async (bookId: string) => {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    return deletedBook;
  } catch (error) {
    throw new Error('An error occurred while deleting the book.');
  }
}

export const booksService = {
  createBookService,
  getAllBooksService,
  getBooksByCategoryIdService,
  getBookByIdService,
  updateBookByIdService,
  deleteBookByIdService,
};
