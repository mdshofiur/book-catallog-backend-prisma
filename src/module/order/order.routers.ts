import express from 'express';
import { orderControllers } from './order.controllers';
import authenticate from '../../middleware/authMiddleware';
import { CurrentUser } from '../../middleware/currentUser';



const ordersRoute = express.Router();


ordersRoute.post('/create-order', CurrentUser, orderControllers.createOrderController)

ordersRoute.get('/', orderControllers.getAllOrdersController)

ordersRoute.get('/customer', authenticate, orderControllers.getAllOrdersByUserController)

ordersRoute.get('/:orderId', CurrentUser, orderControllers.getOrderByIdController)

export default ordersRoute;