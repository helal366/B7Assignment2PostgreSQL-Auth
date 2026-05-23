import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../configs/env.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/index.js";
export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access. Token not found");
      }
      
      const verifyJwtToken = (token: string, secret: string) => {
        const verifiedToken = jwt.verify(token, secret);
        return verifiedToken;
      };
      const verifyToken = verifyJwtToken(
        accessToken,
        envVars.ACCESS_SECRET,
      ) as JwtPayload;
      if (authRoles.length>0 && !authRoles.includes(verifyToken.role))
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "The current role is not permitted",
        );
      const userData = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [verifyToken.email],
      );
      if (userData.rows.length===0)
        throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
    req.user=verifyToken;
    next();
    } catch (error) {
      next(error);
    }
  };
