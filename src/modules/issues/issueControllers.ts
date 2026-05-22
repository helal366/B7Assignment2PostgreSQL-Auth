import { catchAsync } from "../../utils/catchAsync.js";
import type { Request, Response, NextFunction } from "express";
import { issueServices } from "./issueServices.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import { ESort } from "./issueInterfaces.js";

const createIssueController=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const user= req.user;
    if(!user){
        throw new AppError(StatusCodes.UNAUTHORIZED,"Unauthorized access!")
    }
    const result =await issueServices.createIssueServices(req.body, user.id);
    // console.log({result})
    sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Issue created successfully.",
            data: result,
          });
})
const getAllIssuesController=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const sort = req.query.sort;
  
    let finalSort:ESort=ESort.newest;

    if(sort){
        if(typeof sort !== "string" || !Object.values(ESort).includes(sort as ESort)){
            throw new AppError(StatusCodes.BAD_REQUEST, "Invalid sort value. Allowed values are 'newest' or 'oldest'.")
        }
        finalSort=sort as ESort
    }
    const result = await issueServices.getAllIssuesServices(finalSort);
    console.log(result)
    sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Issues retrieved successfully.",
            data: result,
          });
})
export const issueControllers= {
    createIssueController,
    getAllIssuesController
}