import { catchAsync } from "../../utils/catchAsync.js";
import type { Request, Response, NextFunction } from "express";
import { issueServices } from "./issueServices.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken"
import {
  EIssueSort,
  type TIssueStatus,
  type TIssueType,
} from "./issueInterfaces.js";
import { typeStatusValidity } from "./typeStatusValidity.js";

const createIssueController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access!");
    }
    const result = await issueServices.createIssueServices(req.body, user.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Issue created successfully.",
      data: result,
    });
  },
);
const getAllIssuesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sort, type, status } = req.query;

    let finalSort: EIssueSort = EIssueSort.newest;

    if (sort) {
      if (
        typeof sort !== "string" ||
        !Object.values(EIssueSort).includes(sort as EIssueSort)
      ) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Invalid sort value. Allowed values are 'newest' or 'oldest'.",
        );
      }
      finalSort = sort as EIssueSort;
    }
    
    let finalType: TIssueType | undefined;
    let finalStatus: TIssueStatus | undefined;
     typeStatusValidity({type, status})

   if(type){
       finalType = type as TIssueType;
     }
   if(status){
     finalStatus = status as TIssueStatus;
   }
   
    const result = await issueServices.getAllIssuesServices(
      finalSort,
      finalType,
      finalStatus,
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Issues retrieved successfully.",
      data: result,
    });
  },
);
const getSingleIssueController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await issueServices.getSingleIssueServices(Number(id));
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      data: result,
    });
  },
);
const updateIssueController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   const user= req.user;
   if(!user){
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access")
   }
    const { id } = req.params;
    const idNumber= Number(id);
    if(isNaN(idNumber)){
      throw new AppError(StatusCodes.BAD_REQUEST,"Invalid ID.")
    }
    
    typeStatusValidity(req.body)
    
    const result = await issueServices.updateIssueServices(
      Number(id),
      req.body,
      user as jwt.JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:"Issue updated successfully",
      data: { result},
    });
  },
);
const deleteIssueController=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const {id}= req.params;
  const idNumber= Number(id);
  if(isNaN(idNumber)){
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID")
  }
 await issueServices.deleteIssueServices(Number(id));
  sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:"Issue deleted successfully.",
    });
})
export const issueControllers = {
  createIssueController,
  getAllIssuesController,
  getSingleIssueController,
  updateIssueController,
  deleteIssueController
};
