import {
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import sequelize from "../db";
import User from "./user.model";

interface MantraAttributes {
  id: number;
  message: string;
}

type MantraCreationAttributes = Optional<MantraAttributes, "id">;

class Mantra
  extends Model<MantraAttributes, MantraCreationAttributes>
  implements MantraAttributes
{
  public id!: number;
  public message!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public setUser!: BelongsToSetAssociationMixin<User, number>;
  public createUser!: BelongsToCreateAssociationMixin<User>;

  public readonly user?: User;
}

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
