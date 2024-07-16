import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import asyncErrorHandler from "../features/async.error.handler";
import User from "../models/user.model";
import generateToken from "../utils/jwt";
import { createAccount } from "../dtos/request.dto";
import CustomeError from "../features/custome.error";

export const sign_up = asyncErrorHandler(
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

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("contents.content");

    if (!user) {
      res.status(401).json({
        message: `Invalid credentials`,
      });
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const email = { email: user.email };
      const token = generateToken(email);

      res.status(200).json({
        status: "success",
        message: "User with specified email address",
        token,
        user,
      });
    }
  }
);
