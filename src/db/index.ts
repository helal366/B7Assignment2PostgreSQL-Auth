import { Pool } from "pg";
import { envVars } from "../configs/env.js";

export const pool = new Pool({
  connectionString: envVars.NEON_DB_LINK,
});
export const initDB = async () => {
  try {
    // enums
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
      // functions
    await pool.query(`
        CREATE OR REPLACE FUNCTION update_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at=NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `)
    // tables
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
            title VARCHAR(150) NOT NULL,
            description TEXT CHECK (char_length(description)>=20) NOT NULL,
            type issue_type NOT NULL,
            status status_type NOT NULL DEFAULT 'open',
            reporter_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
    // triggers

    await pool.query(`
      DROP TRIGGER IF EXISTS update_issues_updated_at ON issues;

      CREATE TRIGGER update_issues_updated_at
      BEFORE UPDATE ON issues
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
      `)
    await pool.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;

      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
      `)
    console.log("Database connected.");
  } catch (error) {
    console.error("DB connection failed:", error);
    throw error; 
  }
};
