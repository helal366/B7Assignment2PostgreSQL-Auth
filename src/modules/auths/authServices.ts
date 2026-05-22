import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError.js";
import type { IUserLogin, IUserSignUp, Role } from "./authInterfaces.js"
import { pool } from "../../db/index.js";
import bcrypt from "bcrypt"
import { envVars } from "../../configs/env.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtTokens.js";

const authUserSignUpServices=async(payload:IUserSignUp)=>{
    if(!payload || Object.keys(payload).length===0){
        throw new AppError(StatusCodes.NOT_FOUND, "No information provided. Please provide required informations.")
    }
   const {name, email, password, role}=payload;
   const requiredInfo:(keyof IUserSignUp)[]=["name","email", "password"];
   for(const info of requiredInfo){
    if(!payload[info])
        throw new AppError(StatusCodes.NOT_FOUND, `${info} is required`);
   }
   const userData = await pool.query(`SELECT * FROM users WHERE email =$1`, [email]);
   if(userData.rows.length!==0){
        throw new AppError(StatusCodes.CONFLICT, "This email has already signed up. Please login.")
   }
   const allowedRoles:Role[]=["contributor", "maintainer"];
   let finalRole:Role= "contributor";
   if(role){
    if(!allowedRoles.includes(role)){
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Role Provided.")
    }
    finalRole=role
   }
   const hashedPassword=await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT));
   const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *
    `, [name, email, hashedPassword, finalRole]);
    const user= result.rows[0];
    delete user.password;
    const accessToken = generateAccessToken(user);
    const refreshToken=generateRefreshToken(user);
    return {
        accessToken,
        refreshToken,
        user
    }
}
const authUserLoginServices=async(payload:IUserLogin)=>{
    const {email, password}=payload;
    if(!email){
        throw new AppError(StatusCodes.NOT_FOUND, "Email not provided")
    }
    if(!password){
        throw new AppError(StatusCodes.NOT_FOUND, "Email not provided")
    }
    const userData= await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if(userData.rows.length===0){
        throw new AppError(StatusCodes.NOT_FOUND, "User not found.")
    }
    const user = userData.rows[0];
    delete user.password;
    const accessToken = generateAccessToken(user);
    const refreshToken=generateRefreshToken(user)
    return {
        accessToken,
        refreshToken,
        user
    }
}
export const authServices={
    authUserSignUpServices,
    authUserLoginServices
}