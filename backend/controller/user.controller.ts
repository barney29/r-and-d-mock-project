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
