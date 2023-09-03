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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_routers_1 = __importDefault(require("./module/user/users.routers"));
const category_routers_1 = __importDefault(require("./module/category/category.routers"));
const books_routers_1 = __importDefault(require("./module/books/books.routers"));
const order_routers_1 = __importDefault(require("./module/order/order.routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use('/api/v1/auth', users_routers_1.default);
app.use('/api/v1', users_routers_1.default);
app.use('/api/v1', category_routers_1.default);
app.use('/api/v1/books', books_routers_1.default);
app.use('/api/v1/orders', order_routers_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at ${port}`);
}));
