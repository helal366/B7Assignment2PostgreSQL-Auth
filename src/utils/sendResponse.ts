import type { Response } from "express"
interface IResponse<T>{
    statusCode:number,
    success:true,
    message:string,
    data?:T,
    error?:any
}
export const sendResponse=<T>(res:Response, data: IResponse<T>)=>{
    res.status(data.statusCode).json({
        statusCode:data.statusCode,
        success:data.success,
        message:data.message,
        data:data.data,
        error:data.error
    })
}