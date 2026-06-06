import { Pool } from "pg";

const db = new Pool({
  host: "localhost",
  user: "ben",
  database: "inventoryapp",
  password: "",
  port: 5432
});

export default db;