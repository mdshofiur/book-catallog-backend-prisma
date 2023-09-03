import { orderServices } from "./order.services";
import { Request, Response } from "express";
import { sendApiResponse } from "../../../utils/apiResponse";


/* -------------------------------------------------------------------------- */
/*                           Create order controller                          */
/* -------------------------------------------------------------------------- */
async function createOrderController(req:Request, res:Response) {
    try {
      // Get the orderedBooks from the request body
      const { orderedBooks } = req.body;
      
      // Assuming you have middleware that sets user data in res.locals
      const user = res.locals.user;
      // Create the order using the orderServices
      const order = await orderServices.createOrderService(
        user.userId,
        user.role,
        orderedBooks
      );
      sendApiResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      sendApiResponse(res, {
        success: false,
        statusCode: 500,
        message: 'Error creating order'
      });
    }
  }


/* -------------------------------------------------------------------------- */
/*                           Get all Orders controller                        */
/* -------------------------------------------------------------------------- */

const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const allOrders = await orderServices.getAllOrdersService();
        sendApiResponse(res, {
        success: true,
        statusCode: 200,
        message: 'All orders fetched successfully',
        data: allOrders,
        });
    } catch (error) {
        sendApiResponse(res, {
        success: false,
        statusCode: 500,
        message: 'Error getting all orders',
        });
    }
    }


/* -------------------------------------------------------------------------- */
/*                       Get all Orders by specific user                      */
/* -------------------------------------------------------------------------- */

const getAllOrdersByUserController = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const allOrders = await orderServices.getAllOrdersByUserService(user.userId);
        sendApiResponse(res, {
        success: true,
        statusCode: 200,
        message: 'All orders fetched successfully',
        data: allOrders,
        });
    } catch (error) {
        sendApiResponse(res, {
        success: false,
        statusCode: 500,
        message: 'Error getting all orders',
        });
    }
    }



/* -------------------------------------------------------------------------- */
/*               Get Order by specific admin and customer controller          */
/* -------------------------------------------------------------------------- */
 async function getOrderByIdController(req: Request, res: Response) {
      try {
        const { orderId } = req.params;
        const user = res.locals.user;
        const order = await orderServices.getOrderByIdService(orderId, user.userId, user.role);
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Order fetched successfully',
          data: order,
        });
      } catch (error:any) {
        res.status(403).json({
          success: false,
          statusCode: 403,
          message: error.message || 'Error fetching order',
        });
      }
    }


export const orderControllers = {
  createOrderController,
  getAllOrdersController,
  getAllOrdersByUserController,
  getOrderByIdController
};
