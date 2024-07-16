import { Router } from "express";
import { sign_up } from "../controller/auth.controller";
import { login } from "../controller/auth.controller";

export const authRouter = Router();

authRouter.route("/").post(sign_up).get(login);
