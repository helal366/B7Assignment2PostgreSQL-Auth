import express,  {type Application,type Request,type Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { authRoutes,  } from "./modules/auths/authRoutes.js";
import { issueRoutes } from "./modules/issues/issueRoutes.js";

export const app:Application= express()
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/issues', issueRoutes)

app.get('/', (req:Request, res: Response)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Assignment 2!!!"
    })
})

app.use(globalErrorHandler);
app.use(notFound);