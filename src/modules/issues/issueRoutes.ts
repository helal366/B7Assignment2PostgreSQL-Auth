import { Router } from "express";
import { issueControllers } from "./issueControllers.js";
import { checkAuth } from "../../middlewares/chackAuth.js";
import { ERole } from "../auths/authInterfaces.js";

export const issueRoutes = Router();
issueRoutes.post('/',checkAuth(...Object.values(ERole)) ,issueControllers.createIssueController);
issueRoutes.get('/', issueControllers.getAllIssuesController);
issueRoutes.get('/:id', issueControllers.getSingleIssueController)