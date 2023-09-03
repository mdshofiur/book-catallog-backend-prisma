import express from 'express';
import { orderControllers } from './order.controllers';
import authenticate from '../../middleware/authMiddleware';


const ordersRoute = express.Router();


ordersRoute.post('/create-order', authenticate, orderControllers.createOrderController)

ordersRoute.get('/', orderControllers.getAllOrdersController)

ordersRoute.get('/customer', authenticate, orderControllers.getAllOrdersByUserController)

ordersRoute.get('/:id', orderControllers.getOrderByIdController)

export default ordersRoute;