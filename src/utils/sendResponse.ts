import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default SendResponse;
