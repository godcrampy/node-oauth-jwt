import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class Mantra extends Model {}

Mantra.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Mantra",
  }
);

export default Mantra;
