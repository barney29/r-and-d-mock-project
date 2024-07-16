import User from "../models/user.model";
import asyncErrorHandler from "../features/async.error.handler";
import { createAccount } from "../dtos/request.dto";
import { NextFunction, Request, Response } from "express";
import CustomeError from "../features/custome.error";

export const create_user = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      confirmPassword,
      level,
    } = req.body as createAccount;

    const user = await User.create({ ...req.body });

    if (!user) {
      const error = new CustomeError(
        500,
        "For some reason account was not created!"
      );
      next(error);
    }

    if (user) {
      res.status(201).json({
        status: "success",
        message: "Account has been created successfully",
        user,
      });
    }
  }
);

export const get_all_user = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});

    if (!users) {
      res.status(200).json({
        message: "Currentyl ther are no users",
        users: [],
      });
    }

    if (users) {
      res.status(200).json({
        message: "List of users",
        users,
      });
    }
  }
);

export const get_user = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(404).json({
        message: `There is no user based on the specified ${email}`,
      });
    }

    if (user) {
      res.status(200).json({
        message: "User with specified email address",
        user,
      });
    }
  }
);
export const update_user = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: `There is no user based on the specified ID: ${id}`,
      });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    // Check if update was successful
    if (!updatedUser) {
      return next(new CustomeError(422, "Unable to update profile"));
    }

    // Return response with updated user
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  }
);
export const delete_user = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      res.status(404).json({
        message: `There is no user based on the specified ${id}`,
      });
    }
    if (deletedUser) {
      res.status(200).json({
        message: "Profile Deleted successfully",
      });
    }
  }
);
