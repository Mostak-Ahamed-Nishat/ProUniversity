import { Request, Response, NextFunction } from "express";
import status from "http-status";

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API not found!",
  });
};

export default notFoundErrorHandler;
