import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../features/async.error.handler";
import Post from "../models/post.model";
import User from "../models/user.model";

export const getPost = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById({ _id: req.params.id });

    if (!post) {
      return res.status(404).json({
        message: "There is no post with specified id",
      });
    }

    if (post) {
      req.body.oldpost = post;
      return next();
    }
  }
);

export const diff_content_type = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //check if the content type changed
    if (req.body.oldpost.content_type !== req.body.content_type) {
      req.body.isContentChanged = true;
      return next();
    }
    req.body.isContentChanged = false;

    return next();
  }
);
