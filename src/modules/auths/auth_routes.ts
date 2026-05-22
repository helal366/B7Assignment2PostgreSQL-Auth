import { Router } from "express";
import { authControllers } from "./authControllers.js";

export const authRoutes= Router();
authRoutes.post('/signup', authControllers.authUserSignUpController)
authRoutes.post('/login', authControllers.authUserLoginController)