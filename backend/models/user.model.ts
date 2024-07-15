import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
        ref: "Post",
      },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = model("users", userSchema);

export default User;
