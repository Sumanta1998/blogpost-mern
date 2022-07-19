const mongoose = require("mongoose");
const Blog = require("../models/blogs");
const User = require("../models/user");
exports.createBlog = (req, res, next) => {
  const user = req.userData;
  console.log(user);
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content,
    writer: new mongoose.Types.ObjectId(user.userId),
  });

  blog
    .save()
    .then((blog) => {
      res.status(200).json({
        message: "Blog Created Successfully!",
        blog: {
          _id: blog._id,
          content: blog.content,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllBlogs = (req, res, next) => {
  const user = req.userData;
  console.log(user);
  Blog.find({ writer: user.userId })
    // .populate("writer", user._id)
    .then((blogs) => {
      const response = {
        count: blogs.length,
        blogs: blogs.map((blog) => {
          return {
            _id: blog._id,
            content: blog.content,
            isApprove: blog.isApprove,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllfeeds = (req, res, next) => {
  // const user = req.userData;
  Blog.find({ isApprove: true })
    .populate("writer")
    .then((blogs) => {
      console.log(blogs);
      const response = {
        count: blogs.length,
        blogs: blogs.map((blog) => {
          return {
            _id: blog._id,
            content: blog.content,
            writer: {
              username: blog.writer.username,
              email: blog.writer.email,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
