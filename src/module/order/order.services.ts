import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                            Create order service                            */
/* -------------------------------------------------------------------------- */
async function createOrderService(
  idUser: string,
  role: string,
  orderedBooks: any
) {
  try {
    // Fetch the order by its ID
    const user = await prisma.user.findUnique({ where: { id: idUser } });
    if (!user) {
      throw new Error("user not found");
    }
    // Check if the user is an admin or the order belongs to the user
    if (role !== "customer") {
      throw new Error(
        "Permission denied. You do not have access to create this order."
      );
    }
    const newOrder = await prisma.order.create({
      data: {
        userId: idUser,
        orderedBooks: orderedBooks,
      },
    });
    return newOrder;
  } catch (error) {
    throw error;
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
        userId: id,
      },
    });
    return allOrders;
  } catch (error) {
    throw new Error("Error getting all orders");
  }
};

/* -------------------------------------------------------------------------- */
/*               Get Orde by specific admin and customer service              */
/* -------------------------------------------------------------------------- */

async function getOrderByIdService(
  orderId: string,
  userId: string,
  role: string
) {
  try {
    // Fetch the order by its ID
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new Error("Order not found");
    }
    // Check if the user is an admin or the order belongs to the user
    if (role === "admin" || (role === "customer" && order.userId === userId)) {
      return order;
    } else {
      throw new Error(
        "Permission denied. You do not have access to this order."
      );
    }
  } catch (error) {
    throw error;
  }
}

export const orderServices = {
  createOrderService,
  getAllOrdersService,
  getAllOrdersByUserService,
  getOrderByIdService,
};
