import sequelize from "../src/db";

export default async () => {
  await sequelize.close();
};
