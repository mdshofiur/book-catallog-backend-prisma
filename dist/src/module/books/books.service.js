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
exports.booksService = exports.getAllBooksService = void 0;
const client_1 = require("@prisma/client"); // Import your Prisma client
const prisma = new client_1.PrismaClient();
/* -------------------------------------------------------------------------- */
/*                            Create books service                            */
/* -------------------------------------------------------------------------- */
const createBookService = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield prisma.book.create({
            data: bookData,
            include: {
                category: true,
            },
        });
        return newBook;
    }
    catch (error) {
        throw new Error("An error occurred while creating the book.");
    }
});
/* -------------------------------------------------------------------------- */
/*                           Get all books service                            */
/* -------------------------------------------------------------------------- */
const getAllBooksService = (page, size, sortBy, sortOrder, minPrice, // Make minPrice optional
maxPrice, // Make maxPrice optional
categoryId, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * size;
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const where = {};
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
            }
            else {
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
        const total = yield prisma.book.count({ where });
        const data = yield prisma.book.findMany({
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
    }
    catch (error) {
        throw new Error('Error fetching books');
    }
});
exports.getAllBooksService = getAllBooksService;
/* -------------------------------------------------------------------------- */
/*                      Get Books by category id service                      */
/* -------------------------------------------------------------------------- */
function getBooksByCategoryIdService(categoryId, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Calculate pagination offsets
            const skip = (page - 1) * size;
            // Fetch books by categoryId with pagination
            const books = yield prisma.book.findMany({
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
            const total = yield prisma.book.count({
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
        }
        catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    });
}
/* -------------------------------------------------------------------------- */
/*                           get book by id service                           */
/* -------------------------------------------------------------------------- */
const getBookByIdService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma.book.findUnique({
            where: {
                id: bookId,
            }
        });
        return book;
    }
    catch (error) {
        throw new Error('An error occurred while fetching the book.');
    }
});
/* -------------------------------------------------------------------------- */
/*                          Update book by id service                         */
/* -------------------------------------------------------------------------- */
const updateBookByIdService = (bookId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield prisma.book.update({
            where: {
                id: bookId,
            },
            data: bookData,
        });
        return updatedBook;
    }
    catch (error) {
        throw new Error('An error occurred while updating the book.');
    }
});
/* -------------------------------------------------------------------------- */
/*                          delete book by id service                         */
/* -------------------------------------------------------------------------- */
const deleteBookByIdService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield prisma.book.delete({
            where: {
                id: bookId,
            },
        });
        return deletedBook;
    }
    catch (error) {
        throw new Error('An error occurred while deleting the book.');
    }
});
exports.booksService = {
    createBookService,
    getAllBooksService: exports.getAllBooksService,
    getBooksByCategoryIdService,
    getBookByIdService,
    updateBookByIdService,
    deleteBookByIdService,
};
