import prisma from '../../../lib/prisma-connect';

type Category = {
  title: string;
};

/* -------------------------------------------------------------------------- */
/*                           Create category service                          */
/* -------------------------------------------------------------------------- */
 const createCategory = async (title: string): Promise<Category> => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        title,
      },
    });
    return newCategory;
  } catch (error) {
    throw new Error("An error occurred while creating the category.");
  }
};

/* -------------------------------------------------------------------------- */
/*                           Get all categories service                       */
/* -------------------------------------------------------------------------- */

 const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    throw new Error("An error occurred while fetching the categories.");
  }
};

/* -------------------------------------------------------------------------- */
/*                             Get Single Category                            */
/* -------------------------------------------------------------------------- */

const getSingleCategory = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
      include: {
        books: true,
      },
    });
    return category;
  } catch (error) {
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                           Update category service                          */
/* -------------------------------------------------------------------------- */

const updateCategory = async (id: string, title: string) => {
    try {
        const category = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            title: title,
        },
        });
        return category;
    } catch (error) {
        throw new Error("An error occurred while updating the category.");
    }
}


/* -------------------------------------------------------------------------- */
/*                         Delete Category Controller                         */
/* -------------------------------------------------------------------------- */

const deleteCategory = async (id: string) => { 
    try {
        const category = await prisma.category.delete({
        where: {
            id: id,
        },
        });
        return category;
    } catch (error) {
        throw new Error("An error occurred while deleting the category.");
    }
}

export const categoryService = { 
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}