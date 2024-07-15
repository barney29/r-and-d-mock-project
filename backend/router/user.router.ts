import { Router } from "express";
import { create_user } from "../controller/user.controller";

export const router = Router();

router.route("/").post(create_user);
