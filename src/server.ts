import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouters from "./module/user/users.routers";
import CategoryRouters from "./module/category/category.routers";
import BooksRouters from "./module/books/books.routers";
import ordersRoute from "./module/order/order.routers";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1/auth', UserRouters);

app.use('/api/v1', UserRouters);

app.use('/api/v1', CategoryRouters);

app.use('/api/v1/books', BooksRouters);

app.use('/api/v1/orders', ordersRoute)

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
