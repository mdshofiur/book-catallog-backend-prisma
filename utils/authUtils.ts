import jwt from 'jsonwebtoken';
import { User } from '.prisma/client'; 
import { UserData } from '../src/types/user.type';

const JWT_SECRET = 'secret';

type ResultType = {
    role: string;
    userId: string;
}

export const generateAuthToken = (user: ResultType) => {
  const payload = {
    userId: user.userId,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1y' });
};


export const verifyAuthToken = (token: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return resolve(null); // Invalid token or token has expired
      }

      const userId = (decoded as { userId: string }).userId;

      const user: User = {
        id: 'some-user-id',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed-password',
        role: 'customer',
        contactNo: '1234567890',
        address: 'Dhaka, Bangladesh',
        profileImg: 'user.jpg',
      };

      resolve(user);
    });
  });
};
