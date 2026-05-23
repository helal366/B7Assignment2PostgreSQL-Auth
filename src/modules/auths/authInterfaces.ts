export type Role= "contributor" | "maintainer"
export enum ERole{
    contributor="contributor",
    maintainer="maintainer"
}
export interface IUser{
    id:number;
    name:string;
    email:string;
    role:Role,
    created_at?:Date,
    updated_at?:Date
}
export type IUserSignUp=Omit<IUser, "id"> & {password:string}

export interface IAuthTokens{
    accessToken:string,
    refreshToken?:string
}
export type IUserLogin= Pick<IUserSignUp, "email" | "password">