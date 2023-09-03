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
exports.orderControllers = void 0;
const order_services_1 = require("./order.services");
const apiResponse_1 = require("../../../utils/apiResponse");
/* -------------------------------------------------------------------------- */
/*                           Create order controller                          */
/* -------------------------------------------------------------------------- */
function createOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the orderedBooks from the request body
            const { orderedBooks } = req.body;
            // Assuming you have middleware that sets user data in res.locals
            const user = res.locals.user;
            // Create the order using the orderServices
            const order = yield order_services_1.orderServices.createOrderService(user.userId, user.role, orderedBooks);
            (0, apiResponse_1.sendApiResponse)(res, {
                success: true,
                statusCode: 200,
                message: 'Order created successfully',
                data: order,
            });
        }
        catch (error) {
            (0, apiResponse_1.sendApiResponse)(res, {
                success: false,
                statusCode: 403,
                message: error.message || 'Error fetching order',
            });
        }
    });
}
/* -------------------------------------------------------------------------- */
/*                           Get all Orders controller                        */
/* -------------------------------------------------------------------------- */
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield order_services_1.orderServices.getAllOrdersService();
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'All orders fetched successfully',
            data: allOrders,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: error.message || 'Error getting all orders',
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                       Get all Orders by specific user                      */
/* -------------------------------------------------------------------------- */
const getAllOrdersByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const allOrders = yield order_services_1.orderServices.getAllOrdersByUserService(user.userId);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'All orders fetched successfully',
            data: allOrders,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: error.message || 'Error fetching order',
        });
    }
});
/* -------------------------------------------------------------------------- */
/*               Get Order by specific admin and customer controller          */
/* -------------------------------------------------------------------------- */
function getOrderByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const user = res.locals.user;
            const order = yield order_services_1.orderServices.getOrderByIdService(orderId, user.userId, user.role);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Order fetched successfully',
                data: order,
            });
        }
        catch (error) {
            res.status(403).json({
                success: false,
                statusCode: 403,
                message: error.message || 'Error fetching order',
            });
        }
    });
}
exports.orderControllers = {
    createOrderController,
    getAllOrdersController,
    getAllOrdersByUserController,
    getOrderByIdController
};
