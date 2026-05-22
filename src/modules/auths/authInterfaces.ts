export type Role= "contributor" | "maintainer"
export interface IUser{
    id:number;
    name:string;
    email:string;
    role:Role
}
export type IUserSignUp=Omit<IUser, "id"> & {password:string}

export interface IAuthTokens{
    accessToken:string,
    refreshToken:string
}