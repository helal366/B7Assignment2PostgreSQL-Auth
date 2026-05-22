import { catchAsync } from "../../utils/catchAsync.js";
import type { Request, Response, NextFunction } from "express";
import { issueServices } from "./issueServices.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import {
  EIssueSort,
  type TIssueStatus,
  type TIssueType,
} from "./issueInterfaces.js";

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
    const allowedTypes: TIssueType[] = ["bug", "feature_request"];
    let finalType:TIssueType | undefined;
    if (type) {
      if (
        typeof type !== "string" ||
        !allowedTypes.includes(type as TIssueType)
      ) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Invalid type value. Allowed values are 'bug' or 'feature_request'.",
        );
      }
    }
    finalType=type as TIssueType;
    const allowedStatus: TIssueStatus[] = ["open", "in_progress", "resolved"];
    let finalStatus:TIssueStatus|undefined
    if (status) {
      if (
        typeof status !== "string" ||
        !allowedStatus.includes(status as TIssueStatus)
      ) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Invalid status value. Allowed values are 'open' or 'in_progress' or 'resolved'.",
        );
      }
    }
    finalStatus= status as TIssueStatus
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
const getSingleIssueController=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {id}=req.params;
    const result =await issueServices.getSingleIssueServices(Number(id));
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      data: result,
    });
})
export const issueControllers = {
  createIssueController,
  getAllIssuesController,
  getSingleIssueController
};
