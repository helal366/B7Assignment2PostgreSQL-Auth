import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import {
  EIssueSort,
  type CreateIssuePayload,
  type TIssueStatus,
  type TIssueType,
  type TUpdateIssue,
} from "./issueInterfaces.js";
import { pool } from "../../db/index.js";
import jwt from "jsonwebtoken";
import { validKeysValuesIssueUpdate } from "../../utils/validKeysValuesIssueUpdate.js";

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
  let values: string[] = [];
  let query = `SELECT * FROM issues`;
  let whereUse: string[] = [];
  if (type) {
    values.push(type);
    whereUse.push(`type=$${values.length}`);
  }
  if (status) {
    values.push(status);
    whereUse.push(`status=$${values.length}`);
  }
  if (whereUse.length > 0) {
    query += ` WHERE ` + whereUse.join(` AND `);
  }
  const order = sort === EIssueSort.newest ? "DESC" : "ASC";
  query += ` ORDER BY created_at ${order}`;
  const issues = await pool.query(query, values);
  return issues.rows;
};
const getSingleIssueServices = async (id: number) => {
  console.log(id, typeof id);
  const issueData = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
  if (issueData.rows.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No issue found.");
  }
  const issue = issueData.rows[0];
  return issue;
};
const updateIssueServices = async (
  issueId: number,
  payload: TUpdateIssue,
  user: jwt.JwtPayload,
) => {

  const {
    validKeys,
    fieldValues
  }= validKeysValuesIssueUpdate(payload)
  const issueData = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
    issueId,
  ]);
  if (issueData.rowCount === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Issue not found.");
  }
  const issue = issueData.rows[0];
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Contributor can only update their own issues.",
      );
    }
    if (issue.status !== "open") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `Contributor can only update their own issue only when status is 'open'. Current issue status is ${issue.status}`,
      );
    }
  }
  const setPart = validKeys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const query = `
  UPDATE issues 
  SET ${setPart}
  WHERE id=$${validKeys.length + 1}
  RETURNING *
  `;
  const result = await pool.query(query, [...fieldValues, issueId]);

  return result.rows[0];
};
const deleteIssueServices = async (issueId: number) => {
  const result = await pool.query(
    `DELETE FROM issues WHERE id=$1 RETURNING *`,
    [issueId],
  );
  if (result.rowCount === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Issue not found. Failed to delete",
    );
  }
  console.log(result.rows[0]);
};
export const issueServices = {
  createIssueServices,
  getAllIssuesServices,
  getSingleIssueServices,
  updateIssueServices,
  deleteIssueServices,
};
