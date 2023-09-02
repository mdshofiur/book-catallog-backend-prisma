import jwt from "jsonwebtoken";
import { User } from ".prisma/client";
import { UserData } from "../src/types/user.type";

const JWT_SECRET = "secret";

type ResultType = {
  role: string;
  userId: string;
};

export const generateAuthToken = (user: ResultType) => {
  const payload = {
    userId: user.userId,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1y" });
};

export const verifyAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
