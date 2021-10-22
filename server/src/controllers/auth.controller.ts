import { RequestHandler, Request, Response } from "express";
import { LoginRequest, SignupRequest } from "../routes/auth.route";
import {
  createNormalUser,
  doesUserExistByEmail,
  getUserByEmail,
} from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "SECRET";

export const login: RequestHandler = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, LoginRequest>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const userExists = await doesUserExistByEmail(email);

    if (!userExists)
      return res.status(401).send({ err: "Email or Password incorrect" });

    const user = await getUserByEmail(email);

    if (!user.password)
      return res
        .status(409)
        .send({ err: "Wrong auth provider", provider: user.auth_provider });
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, secret, {
        expiresIn: "2 days",
      });
      return res.send({ token, name: user.name, email: user.email });
    }

    res.status(401).send({ err: "Email or Password incorrect" });
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const signup: RequestHandler = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, SignupRequest>,
  res: Response
) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await doesUserExistByEmail(email);
    if (userExists) {
      return res.status(409).send({ err: "Email already registered" });
    }

    await createNormalUser(email, name, bcrypt.hashSync(password, 8));

    res.status(201).send({ msg: "User Registered" });
  } catch (err) {
    res.status(500).send({ err });
  }
};
