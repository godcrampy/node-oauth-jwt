import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import { UserDAO } from "../dao/user.dao";
import sequelize from "../db";
import Mantra from "./mantra.model";
import Role from "./role.model";

interface UserAttributes {
  id: number;
  email: string;
  name: string;
  auth_provider: string;
  password: string | null;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public name!: string;
  public auth_provider!: string;
  public password!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMantra!: HasOneGetAssociationMixin<Mantra>;
  public setMantra!: HasOneSetAssociationMixin<Mantra, number>;
  public createMantra!: HasOneCreateAssociationMixin<Mantra>;

  public getRoles!: HasManyGetAssociationsMixin<Role>;
  public addRole!: HasManyAddAssociationMixin<Role, number>;
  public hasRole!: HasManyHasAssociationMixin<Role, number>;
  public countRoles!: HasManyCountAssociationsMixin;
  public removeRole!: HasManyRemoveAssociationMixin<Role, number>;

  public readonly mantra?: Mantra;
  public readonly roles?: Role[];

  public toDAO(): UserDAO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      auth_provider: this.auth_provider,
    };
  }
}

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

User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

export default User;
