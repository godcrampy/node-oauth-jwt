import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import sequelize from "./db";
import Mantra from "./models/mantra.model";
import User from "./models/user.model";

// Constants
const IS_PRODUCTION = process.env.NODE_ENV == "production";
const PORT = process.env.PORT || 8080;

// sync database
(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();

// Express config
const app = express();
app.use(morgan(IS_PRODUCTION ? "combined" : "dev"));

app.get("/", async (_, res) => {
  // res.send("Hello World!");
  // const john = await User.create({
  //   email: "john@doe.com",
  //   name: "john",
  //   auth_provider: "google",
  //   password: "eek",
  // });

  // const mantra = await Mantra.create({
  //   message: "Hello World!",
  //   UserId: 1,
  // });

  // console.log(john);
  // console.log(mantra);
  const john = await User.findOne({
    where: {
      name: "john"
    }, include: Mantra
  });

  console.log(john);
});

app.listen(PORT, () => {
  if (!IS_PRODUCTION) {
    console.log(`Server running on port ${PORT}`);
  }
});
