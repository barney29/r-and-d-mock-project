import { Router } from "express";
import { create_user } from "../controller/user.controller";
import { login } from "../controller/auth.controller";

export const authRouter = Router();

authRouter.route("/").post(create_user).get(login);
