import sequelize from "../src/db";
import { expect, test } from "@jest/globals";
import { Sequelize } from "sequelize";

test("sequelize is exported", async () => {
  await sequelize.authenticate();
  expect(sequelize).toBeInstanceOf(Sequelize);
});
