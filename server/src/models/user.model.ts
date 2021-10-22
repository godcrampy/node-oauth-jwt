import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Mantra from "./mantra.model";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    auth_provider: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasOne(Mantra);
Mantra.belongsTo(User);

export default User;
