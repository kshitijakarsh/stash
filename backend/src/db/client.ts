import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { ENV } from "../core/env";

const client = postgres(ENV.DATABASE_URL);
console.log("Schema loaded:", schema);
export const db = drizzle(client, { schema });
