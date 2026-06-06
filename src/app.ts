import express from "express";
import { getAllCategories } from "./db/queries.js";

const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
  try {
    res.json(await getAllCategories());
  } catch (error) { throw error; }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});