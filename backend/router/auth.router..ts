import { Router } from "express";
import { create_user, get_user } from "../controller/user.controller";

export const authRouter = Router();

authRouter.route("/").post(create_user).get(get_user);
