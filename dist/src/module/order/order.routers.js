"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controllers_1 = require("./order.controllers");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const currentUser_1 = require("../../middleware/currentUser");
const ordersRoute = express_1.default.Router();
ordersRoute.post('/create-order', currentUser_1.CurrentUser, order_controllers_1.orderControllers.createOrderController);
ordersRoute.get('/', authMiddleware_1.default, order_controllers_1.orderControllers.getAllOrdersController);
ordersRoute.get('/customer', currentUser_1.CurrentUser, order_controllers_1.orderControllers.getAllOrdersByUserController);
ordersRoute.get('/:orderId', currentUser_1.CurrentUser, order_controllers_1.orderControllers.getOrderByIdController);
exports.default = ordersRoute;
