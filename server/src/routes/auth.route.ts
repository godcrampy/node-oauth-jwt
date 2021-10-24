import { Router } from "express";
import Joi, { string } from "joi";
import { googleAuth, login, signup } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";

const authRouter = Router();

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export const loginSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required().label("password"),
});

export const signupSchema = Joi.object<SignupRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required(),
  name: Joi.string().required(),
});

export const googleAuthSchema = Joi.object<GoogleAuthRequest>({
  token: Joi.string().required(),
});

authRouter.post("/login", validate(loginSchema), login);

authRouter.post("/signup", validate(signupSchema), signup);

authRouter.post("/google", validate(googleAuthSchema), googleAuth);

export default authRouter;
