import { Router } from "express";
import { issueControllers } from "./issueControllers.js";
import { checkAuth } from "../../middlewares/chackAuth.js";
import { ERole } from "../auths/authInterfaces.js";

export const issueRoutes = Router();
issueRoutes.post('/',checkAuth() ,issueControllers.createIssueController);
issueRoutes.get('/', issueControllers.getAllIssuesController);
issueRoutes.get('/:id', issueControllers.getSingleIssueController);
issueRoutes.patch('/:id',checkAuth(ERole.maintainer, ERole.contributor), issueControllers.updateIssueController);
issueRoutes.delete('/:id', checkAuth(ERole.maintainer), issueControllers.deleteIssueController)