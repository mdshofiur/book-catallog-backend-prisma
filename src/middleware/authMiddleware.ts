import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../../utils/authUtils";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = verifyAuthToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
}

export default authenticate;
