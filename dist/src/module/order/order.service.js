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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const prisma_connect_1 = __importDefault(require("../../../lib/prisma-connect"));
/* -------------------------------------------------------------------------- */
/*                            Create order service                            */
/* -------------------------------------------------------------------------- */
function createOrderService(idUser, role, orderedBooks) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the order by its ID
            const user = yield prisma_connect_1.default.user.findUnique({ where: { id: idUser } });
            if (!user) {
                throw new Error("user not found");
            }
            // Check if the user is an admin or the order belongs to the user
            if (role !== "customer") {
                throw new Error("Permission denied. You do not have access to create this order.");
            }
            const newOrder = yield prisma_connect_1.default.order.create({
                data: {
                    userId: idUser,
                    orderedBooks: orderedBooks,
                },
            });
            return newOrder;
        }
        catch (error) {
            throw error;
        }
    });
}
/* -------------------------------------------------------------------------- */
/*                           Get all Orders service                           */
/* -------------------------------------------------------------------------- */
const getAllOrdersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield prisma_connect_1.default.order.findMany();
        return allOrders;
    }
    catch (error) {
        throw error;
    }
});
/* -------------------------------------------------------------------------- */
/*                       Get all Orders by specific user                      */
/* -------------------------------------------------------------------------- */
const getAllOrdersByUserService = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the order by its ID
        const user = yield prisma_connect_1.default.user.findUnique({ where: { id: idUser } });
        if (!user) {
            throw new Error("user not found");
        }
        // Check if the user is not only a customer
        if (user.role !== "customer") {
            throw new Error("Permission denied. You do not have access to those order.");
        }
        const allOrders = yield prisma_connect_1.default.order.findMany({
            where: {
                userId: idUser,
            },
        });
        return allOrders;
    }
    catch (error) {
        throw error;
    }
});
/* -------------------------------------------------------------------------- */
/*               Get Orde by specific admin and customer service              */
/* -------------------------------------------------------------------------- */
function getOrderByIdService(orderId, userId, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the order by its ID
            const order = yield prisma_connect_1.default.order.findUnique({ where: { id: orderId } });
            if (!order) {
                throw new Error("Order not found");
            }
            // Check if the user is an admin or the order belongs to the user
            if (role === "admin" || (role === "customer" && order.userId === userId)) {
                return order;
            }
            else {
                throw new Error("Permission denied. You do not have access to this order.");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.orderServices = {
    createOrderService,
    getAllOrdersService,
    getAllOrdersByUserService,
    getOrderByIdService,
};
