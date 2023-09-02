import jwt from 'jsonwebtoken';
import { User } from '.prisma/client'; 

const JWT_SECRET = 'your-secret-key';

export const generateAuthToken = (user: User): string => {
  const payload = {
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
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
