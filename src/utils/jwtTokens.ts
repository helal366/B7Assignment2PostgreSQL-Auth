import type { SignOptions } from "jsonwebtoken";
import { envVars } from "../configs/env.js";
import type { IUser } from "../modules/auths/authInterfaces.js";
import { type StringValue } from "ms";
import jwt from "jsonwebtoken";

const jwtPayload = (user: IUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});
export const generateAccessToken = (user: IUser) => {
  const accessSecret = envVars.ACCESS_SECRET as string;
  if (!envVars.ACCESS_SECRET) {
    throw new Error("ACCESS_SECRET is missing");
  }
  const accessTokenExpiresIn = envVars.ACCESS_TOKEN_EXPIRESIN as StringValue;
  const options: SignOptions = {
    expiresIn: accessTokenExpiresIn,
  };
  const accessToken = jwt.sign(jwtPayload(user), accessSecret, options);
  return accessToken;
};
export const generateRefreshToken = (user: IUser) => {
  const refreshSecret = envVars.REFRESH_SECRET as string;
  if (!refreshSecret) throw new Error("REFRESH_SECRET missing");
  const refreshTokenExpiresIn = envVars.REFRESH_TOKEN_EXPIRESIN as StringValue;
  const options: SignOptions = {
    expiresIn: refreshTokenExpiresIn,
  };
  const refreshToken = jwt.sign(jwtPayload(user), refreshSecret, options);
  return refreshToken;
};
