import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const casebaseKey = import.meta.env.VITE_CAREBASE_KEY; 
const sql = neon(casebaseKey);

export const db = drizzle(sql, { schema });
