import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import {
  EIssueSort,
  type CreateIssuePayload,
  type TIssueStatus,
  type TIssueType,
} from "./issueInterfaces.js";
import { pool } from "../../db/index.js";

const createIssueServices = async (
  payload: CreateIssuePayload,
  userId: number,
) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No information provided. Please provide required informations.",
    );
  }
  const { title, description, type, status } = payload;
  const requiredInfo: (keyof CreateIssuePayload)[] = [
    "title",
    "description",
    "type",
  ];
  for (const info of requiredInfo) {
    if (!payload[info]) {
      throw new AppError(StatusCodes.NOT_FOUND, `${info} is required`);
    }
  }
  const allowedTypes: TIssueType[] = ["bug", "feature_request"];
  if (!allowedTypes.includes(type)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid type provided.");
  }
  const allowedStatus: TIssueStatus[] = ["open", "in_progress", "resolved"];
  let finalStatus = "open";
  if (status) {
    if (!allowedStatus.includes(status)) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid status provided.");
    }
    finalStatus = status;
  }
  const reporter_id = userId;
  const result = await pool.query(
    `
            INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [title, description, type, finalStatus, reporter_id],
  );
  const createdIssue = result.rows[0];
  // console.log({createdIssue})
  return createdIssue;
};

const getAllIssuesServices = async (
  sort: EIssueSort,
  type?: TIssueType,
  status?: TIssueStatus,
) => {
    let values:string[] =[];
    let query=`SELECT * FROM issues`;
    let whereUse:string[]=[];
    if(type){
        values.push(type);
        whereUse.push(`type=$${values.length}`)
    }
    if(status){
        values.push(status);
        whereUse.push(`status=$${values.length}`)
    }
    if(whereUse.length>0){
        query += ` WHERE `+ whereUse.join(` AND `) 
    }
  const order = sort === EIssueSort.newest ? "DESC" : "ASC";
  query += ` ORDER BY created_at ${order}`;
  const issues = await pool.query(query, values);
  return issues.rows;
};
export const issueServices = {
  createIssueServices,
  getAllIssuesServices,
};
