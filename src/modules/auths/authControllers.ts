import type {Request,Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { authServices } from "./authServices.js";
import { setAuthtokensInCookies } from "../../utils/setAuthTokensInCookies.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const authUserSignUpController=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const tokens = await authServices.authUserSignUpServices(req.body);
    // console.log(tokens)
    setAuthtokensInCookies(req,res, tokens);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User registered successfully.",
        data: tokens.user,
      });
})
const authUserLoginController=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const loginInfo = await authServices.authUserLoginServices(req.body);
    setAuthtokensInCookies(req,res, loginInfo);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Login successful.",
        data: {
            token: loginInfo.accessToken,
            user:loginInfo.user
        },
      });
})
export const authControllers= {
    authUserSignUpController,
    authUserLoginController
}