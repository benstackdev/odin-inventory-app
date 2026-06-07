import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import indexRouter from "./routers/indexRouter.js";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Necessary for POST/PUT requests
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});