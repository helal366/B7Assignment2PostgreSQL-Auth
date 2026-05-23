import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { envVars } from "../configs/env.js";

export const globalErrorHandler = (
  error: Error | AppError | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error);

  let statusCode = 500;
  let message = "Something went wrong";

  //  Custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  //  PostgreSQL errors
  else if (error?.code) {
    switch (error.code) {
      case "23505":
        statusCode = 400;
        message = "Duplicate value violates unique constraint";
        break;

      case "23503":
        statusCode = 400;
        message = "Invalid reference (foreign key violation)";
        break;

      case "23502":
        statusCode = 400;
        message = "Missing required field (NOT NULL violation)";
        break;

      case "22P02":
        statusCode = 400;
        message = "Invalid input format";
        break;

      default:
        message = error.message;
    }
  }

  //  Generic JS error
  else if (error instanceof Error) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(envVars.NODE_ENV === "development" && {
      stack: error instanceof Error ? error.stack : undefined,
    }),
  });
};
