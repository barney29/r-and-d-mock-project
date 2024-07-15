import { Router } from "express";
import { get_all_user } from "../controller/user.controller";

export const usersRouter = Router()

usersRouter.route("/").get(get_all_user)