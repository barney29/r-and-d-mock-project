import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },

  tag: {
    type: [String],
  },
  description: {
    type: String,
  },
  start_date: {
    type: Date,
    required: [true, "Starting date is required"],
  },
  end_date: {
    type: Date,
    required: [true, "End date is required"],
  },
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Expired"],
  },
  content_type: {
    type: String,
  },
});

const Post = model("posts", postSchema);

export default Post;
