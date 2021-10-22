import { Router } from "express";
import passport from "passport";
import { allUsers } from "../controllers/user.controller";
import handlePassportError from "../middlewares/error.middleware";
import hasRole from "../middlewares/role.middleware";
import { RoleName } from "../models/role.model";

const userRouter = Router();

userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.ADMIN),
  allUsers,
  handlePassportError(401)
);

export default userRouter;
