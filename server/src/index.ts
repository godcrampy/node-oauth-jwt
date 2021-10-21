import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const IS_PRODUCTION = process.env.NODE_ENV == "production";
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan(IS_PRODUCTION ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const a = 5;
app.listen(PORT, () => {
  if (!IS_PRODUCTION) {
    console.log(`Server running on port ${PORT}`);
  }
});
