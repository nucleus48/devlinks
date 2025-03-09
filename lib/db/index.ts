import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const client = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client, schema });
