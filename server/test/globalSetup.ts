import sequelize from "../src/db";
import Role, { RoleName } from "../src/models/role.model";
import { toTitleCase } from "../src/util/string.util";
import bcrypt from "bcrypt";
import User from "../src/models/user.model";
// SETUP TESTS

const clearDB = async () => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.query(`DROP DATABASE ${process.env.DB_NAME};`);
  await sequelize.query(`CREATE SCHEMA ${process.env.DB_NAME};`);
  await sequelize.query(`USE ${process.env.DB_NAME};`);
  await sequelize.sync();
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
};

const addMockData = async () => {
  const normalRole = await Role.create({
    name: RoleName.NORMAL,
    description: toTitleCase(RoleName.NORMAL),
  });
  const adminRole = await Role.create({
    name: RoleName.ADMIN,
    description: toTitleCase(RoleName.ADMIN),
  });

  const john = await User.create({
    name: "john",
    auth_provider: "email",
    password: bcrypt.hashSync("reallybadpassword", 8),
    email: "john@example.com",
  });

  john.addRole(normalRole);
  john.addRole(adminRole);

  const jan = await User.create({
    name: "jan",
    auth_provider: "email",
    password: bcrypt.hashSync("reallybadpassword", 8),
    email: "jan@example.com",
  });
  jan.addRole(normalRole);

  const larry = await User.create({
    name: "larry",
    auth_provider: "google",
    password: null,
    email: "larry@example.com",
  });
  larry.addRole(normalRole);
};

export default async () => {
  await clearDB();
  await addMockData();
};
