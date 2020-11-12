import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
export const pool = new Pool({ connectionString });
