import { NextFunction } from "express";
import mongoose, { Document, Error, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import CustomeError from "../features/custome.error";

interface Content {
  content: mongoose.Types.ObjectId;
  seen: boolean;
}

export interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword?: string;
  level: string;
  contents: Content[];
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - phone_number
 *        - email
 *        - password
 *        - confirmPassword
 *      properties:
 *        first_name:
 *          type: string
 *          default: Joe
 *        last_name:
 *          type: string
 *          default: Doe
 *        phone_number:
 *          type: string
 *          default: 0966443321
 *        email:
 *          type: string
 *          default: Joe.doe@gmail.com
 *        password:
 *          type: string
 *          default: random1234
 *        confirmPassword:
 *          type: string
 *          default: random1234
 */

const userSchema = new Schema<User>({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    unique: true,
  },

  phone_number: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
  },
  confirmPassword: {
    type: String,
  },
  level: {
    type: String,
    enum: ["admin", "expert", "user1", "user2"],
    default: "expert",
  },
  contents: [
    {
      content: {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  if (this.password === this.confirmPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      this.confirmPassword = "";
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    const error = new CustomeError(402, "Confirmed password does not match");
    next(error);
  }
});
const User = model<User>("users", userSchema);
export default User;
