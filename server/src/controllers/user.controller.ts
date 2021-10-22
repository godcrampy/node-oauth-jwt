import { RequestHandler, Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const allUsers: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  const users = await getAllUsers();
  res.send(users.map((user) => user.toDAO()));
};
