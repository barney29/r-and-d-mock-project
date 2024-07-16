import {
  delete_post,
  get_post,
  update_post,
} from "./../controller/post.controller";
import { Router } from "express";
import { create_post, get_all_post } from "../controller/post.controller";
import { diff_content_type, getPost } from "../middlewares/post.middleware";

export const postRouter = Router();

postRouter.route("/").get(get_all_post).post(create_post);

postRouter
  .route("/:id")
  .get(get_post)
  .put(getPost, diff_content_type, update_post)
  .delete(delete_post);
