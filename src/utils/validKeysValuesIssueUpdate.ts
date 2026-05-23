import { StatusCodes } from "http-status-codes";
import { AppError } from "./appError.js";
import type { TUpdateIssue } from "../modules/issues/issueInterfaces.js";

export const validKeysValuesIssueUpdate = (payload: TUpdateIssue) => {
  const allowedFields = ["title", "description", "type", "status"];
  const fieldKeys = Object.keys(payload);
  if (fieldKeys.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "No valid field provided!");
  }

  const invalidFields = fieldKeys.filter((key) => !allowedFields.includes(key));

  if (invalidFields.length > 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Invalid fields: ${invalidFields.join(", ")}`,
    );
  }
  const fieldValues = fieldKeys.map(
    (key) => payload[key as keyof typeof payload],
  );
  return {
    validKeys:fieldKeys,
    fieldValues
  }
};
