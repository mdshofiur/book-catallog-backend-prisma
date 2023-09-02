import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string ;
  data?: any;
  error?: string;
}

export const sendApiResponse = (res: Response, data: ApiResponse) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};
