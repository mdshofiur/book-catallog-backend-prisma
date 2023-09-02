import { Prisma, PrismaClient } from "@prisma/client"; // Import your Prisma client

const prisma = new PrismaClient();


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

export const booksService = {
  createBookService,
  getAllBooksService,
};
