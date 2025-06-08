import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const supabase = postgres(connectionString);

export default supabase;
