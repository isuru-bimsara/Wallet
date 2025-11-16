import {neon} from '@neondatabase/serverless';
import "dotenv/config.js";

//cretae a sql connection 
export const sql = neon(process.env.DATABASE_URL);