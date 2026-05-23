import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import type { TIssueStatus, TIssueType } from "./issueInterfaces.js";
interface ITypeStatus{
  type?:unknown,
  status?:unknown
}
export const typeStatusValidity = (payload: ITypeStatus) => {
  if(payload.type != null){
    const type=payload.type
    const allowedTypes: TIssueType[] = ["bug", "feature_request"];
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
  if(payload.status !=null){
    const status=payload.status;
    const allowedStatus: TIssueStatus[] = ["open", "in_progress", "resolved"];
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
};
