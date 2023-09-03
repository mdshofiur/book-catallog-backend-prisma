import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../../utils/authUtils";

export async function CurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader: string | undefined = req.headers.authorization;

  if (authHeader === undefined) {
    res.status(401).send({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = verifyAuthToken(token);
    if (typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }
    if ("userId" in decodedToken && "role" in decodedToken) {
      const user = {
        userId: decodedToken.userId,
        role: decodedToken.role,
      };
      res.locals.user = user;
      next();
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
}
