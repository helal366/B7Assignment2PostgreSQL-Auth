import dotenv from 'dotenv';
dotenv.config();
interface EnvVariables{
    NEON_DB_LINK:string;
    PORT:string;
    BCRYPT_SALT:string;
    ACCESS_SECRET:string;
    ACCESS_TOKEN_EXPIRESIN:string;
    REFRESH_SECRET:string;
    REFRESH_TOKEN_EXPIRESIN:string
}
const loadEnvVariables=():EnvVariables=>{
    const envVars:string[]=["NEON_DB_LINK", "PORT", "BCRYPT_SALT","ACCESS_SECRET","ACCESS_TOKEN_EXPIRESIN","REFRESH_SECRET", "REFRESH_TOKEN_EXPIRESIN"];
    for(const varName of envVars){
        if(!process.env[varName]){
            throw new Error(`Required environment variable missing: ${varName}`)
        }
    }
    return {
        NEON_DB_LINK:process.env.NEON_DB_LINK as string,
        PORT:process.env.PORT as string,
        BCRYPT_SALT:process.env.BCRYPT_SALT as string,
        ACCESS_SECRET:process.env.ACCESS_SECRET as string,
        ACCESS_TOKEN_EXPIRESIN:process.env.ACCESS_TOKEN_EXPIRESIN as string,
        REFRESH_SECRET:process.env.REFRESH_SECRET as string,
        REFRESH_TOKEN_EXPIRESIN:process.env.REFRESH_TOKEN_EXPIRESIN as string
    }
}
export const envVars=loadEnvVariables()