import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                            Create order service                            */
/* -------------------------------------------------------------------------- */
async function createOrderService(idUser: string, orderedBooks: any) {
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: idUser,
        orderedBooks: orderedBooks,
      },
    });
    return newOrder;
  } catch (error) {
    throw new Error("Error creating order");
  }
}

/* -------------------------------------------------------------------------- */
/*                           Get all Orders service                           */
/* -------------------------------------------------------------------------- */

const getAllOrdersService = async () => {
  try {
    const allOrders = await prisma.order.findMany();
    return allOrders;
  } catch (error) {
    throw new Error("Error getting all orders");
  }
};


/* -------------------------------------------------------------------------- */
/*                       Get all Orders by specific user                      */
/* -------------------------------------------------------------------------- */


const getAllOrdersByUserService = async (id: string) => {
    try {
        const allOrders = await prisma.order.findMany({
        where: {
            userId: id
        }
        });
        return allOrders;
    } catch (error) {
        throw new Error("Error getting all orders");
    }
    }

export const orderServices = {
  createOrderService,
  getAllOrdersService,
  getAllOrdersByUserService
};
