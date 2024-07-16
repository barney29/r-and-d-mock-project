import { Router } from "express";
import {
  delete_user,
  get_all_user,
  get_user_by_id,
  update_user,
} from "../controller/user.controller";

export const usersRouter = Router();

usersRouter.route("/").get(get_all_user);

usersRouter
  .route("/:id")
  .get(get_user_by_id)
  .put(update_user)
  .delete(delete_user);
