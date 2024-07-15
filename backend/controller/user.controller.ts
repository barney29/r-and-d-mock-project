import User from "../models/user.model";
import asyncErrorHandler from "../features/async.error.handler";
import { createAccount } from "../dtos/request.dto";
import { NextFunction, Request, Response } from "express";
import CustomeError from "../features/custome.error";

// const isValidValue = (requests: string[]) => {
//   for (var request of requests) {
//     if (request.trim() === "") {
//       return {request, };
//     }

//   }
//   return
// };
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
    const { id } = req.params;
    const user = await User.find({ id });

    if (!user) {
      res.status(404).json({
        message: `There is no user base on the specified ${id}`,
      });
    }

    if (user) {
      res.status(200).json({
        message: "User with specified id",
        user,
      });
    }
  }
);

export const updateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.find({ id });

    if (!user) {
      res.status(404).json({
        message: `There is no user base on the specified ${id}`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate({
      id,
      ...req.body,
    });
    if (!updateUser) {
      const error = new CustomeError(422, "Unable to update profile");
      next(error);
    }

    res.status(202).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  }
);

export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.find({ id });

    if (!user) {
      res.status(404).json({
        message: `There is no user base on the specified ${id}`,
      });
    }

    const deletedUser = await User.findByIdAndDelete({
      id,
      ...req.body,
    });
    if (!updateUser) {
      const error = new CustomeError(422, "Unable to delete profile");
      next(error);
    }

    res.status(204).json({
      message: "Profile Deleted successfully",
    });
  }
);
