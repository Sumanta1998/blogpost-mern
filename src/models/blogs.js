const mongoose = require("mongoose");
const User = require("./user");

const blogSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    content: {
      type: String,
      required: true,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    isApprove: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
