import { Response, Request, NextFunction } from "express";
import asyncErrorHandler from "../features/async.error.handler";
import CustomeError from "../features/custome.error";
import Post from "../models/post.model";
import User from "../models/user.model";
import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongoose";

export const create_post = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      content,
      tag,
      description,
      start_date,
      end_date,
      status,
      content_type,
    } = req.body;
    const post = await Post.create({
      title,
      content,
      tag,
      description,
      start_date,
      end_date,
      status,
      content_type,
    });

    if (!post) {
      const error = new CustomeError(
        524,
        "Post couldn't be created for some reason"
      );
      next(error);
    }

    //find the respective user and notify
    const users = await User.find({ level: content_type });
    //loop over and update their value
    for (let user of users) {
      const content = { content: post._id, seen: false };
      user.contents.push(content);
      await user.save();
    }
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  }
);
export const get_all_post = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find({});

    if (!posts) {
      res.status(404).json({
        message: "There are no post list available",
        posts,
      });
    }

    if (posts) {
      res.status(200).json({
        message: "post list of posts",
        posts,
      });
    }
  }
);
export const get_post = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    if (!post) {
      res.status(404).json({
        message: "There are no post available",
        post,
      });
    }

    if (post) {
      res.status(200).json({
        message: "Post retrieved successfully",
        post,
      });
    }
  }
);
export const update_post = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedPost) {
      const error = new CustomeError(
        404,
        `There are no post with specified ${id} `
      );
      next(error);
    }

    if (updatedPost) {
      console.log(updatedPost);
      if (req.body.isContentChanged) {
        const users = await User.find({ level: req.body.oldpost.content_type });
        const objId = new mongoose.Types.ObjectId("4edd40c86762e0fb12000003");
        for (let user of users) {
          user.contents = user.contents.filter((post) => {
            post.content !== objId;
          });
          await user.save();
          console.log(user.contents);
        }
      }
      res.status(202).json({
        message: "Post udated successfully",
        post: updatedPost,
      });
    }
  }
);
export const delete_post = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete({ _id: id });

    if (!deletedPost) {
      const error = new CustomeError(
        404,
        `There are no post with specified ${id} `
      );
      next(error);
    }

    if (deletedPost) {
      const users = await User.find({ level: req.body.oldpost.content_type });
      const objId = new mongoose.Types.ObjectId(id);
      for (let user of users) {
        user.contents = user.contents.filter((post) => {
          post.content !== objId;
        });
        await user.save();
      }
    }
    res.status(202).json({
      message: "Post deleted successfully",
    });
  }
);
