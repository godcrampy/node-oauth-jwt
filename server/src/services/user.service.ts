import { RoleName } from "../models/role.model";
import User from "../models/user.model";
import { getRoleByNameOrCreate } from "./role.service";

export const doesUserExistByEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ where: { email } });
  if (user) return true;
  return false;
};

export const createNormalUser = async (
  email: string,
  name: string,
  password: string | null
): Promise<User> => {
  // Assumes that user with email does not exist
  const normalRole = await getRoleByNameOrCreate(RoleName.NORMAL);

  const user = await User.create({
    name,
    auth_provider: "email",
    email,
    password,
  });
  await user.addRole(normalRole);
  return user;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await User.findOne({ where: { email } });
  if (user) return user;
  throw `Error: User with email ${email} does not exist`;
};

export const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll();
};
