import { sign_up } from "./../controller/auth.controller";
import { Router } from "express";
import { login } from "../controller/auth.controller";

export const authRouter = Router();

authRouter.post("/", sign_up);

authRouter.get("/", login);
