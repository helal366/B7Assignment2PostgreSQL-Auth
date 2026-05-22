import {type Response} from "express";
import type { IAuthTokens } from "../modules/auths/authInterfaces.js";
export const setAuthtokensInCookies=(res:Response, tokens:IAuthTokens)=>{
    if(tokens.accessToken){
        res.cookie("accessToken", tokens.accessToken, {httpOnly:true, secure:false})
    }
    if(tokens.refreshToken){
        res.cookie("refreshToken", tokens.refreshToken, {httpOnly:true, secure:false})
    }
}