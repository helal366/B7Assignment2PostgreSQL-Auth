import { Pool } from "pg";
import { envVars } from "../configs/env.js";

export const pool = new Pool({
  connectionString: envVars.NEON_DB_LINK,
});
export const initDB = async () => {
  try {
    await pool.query(` 
        DO $$ BEGIN
        CREATE TYPE issue_type AS ENUM ('bug', 'feature_request');
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$
    `);
    await pool.query(` 
        DO $$ BEGIN
        CREATE TYPE role_type AS ENUM ('contributor', 'maintainer');
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$
    `);
    await pool.query(` 
        DO $$ BEGIN
        CREATE TYPE status_type AS ENUM ('open', 'in_progress', 'resolved');
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$
    `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE ,
            password TEXT NOT NULL,
            role role_type NOT NULL DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,
            title VARCHAR(150),
            description TEXT CHECK (char_length(description)>=20),
            type issue_type NOT NULL,
            status status_type NOT NULL,
            reporter_id VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
    console.log("Database connected.");
  } catch (error) {
    console.error("DB connection failed:", error);
    throw error; // NOT a generic message
  }
};
