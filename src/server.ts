import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouters from "./module/user/users.routers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1/auth', UserRouters);

app.use('/api/v1', UserRouters);


app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
