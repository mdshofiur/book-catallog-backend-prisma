import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_TOKEN as string;

type ResultType = {
  role: string;
  userId: string;
};

// Generate a token
export const generateAuthToken = (user: ResultType) => {
  const payload = {
    userId: user.userId,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1y" });
};

// Verify the token
export const verifyAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
