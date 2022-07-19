const mongoose = require("mongoose");
const Blog = require("../models/blogs");
const User = require("../models/user");
exports.getAllBlogs = (req, res, next) => {
  Blog.find()
    .exec()
    .then((blogs) => {
      //   console.log(blogs);
      const response = {
        count: blogs.length,
        blogs: blogs.map((blog) => {
          return {
            _id: blog._id,
            content: blog.content,
            writer: blog.writer,
          };
        }),
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        blogs: users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteOneBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  //   Blog.findByIdAndUpdate( {
  //     _id: blogId,
  //   }, { isDeleted: true },
  Blog.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true } })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Delete Blog Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteOneUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndUpdate({ _id: userId }, { $set: { isDeleted: true } })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Delete User Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.approveUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);

  User.findByIdAndUpdate({ _id: userId }, { $set: { role: "WRITER" } })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Approve User Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};
exports.approveBlog = (req, res, next) => {
  const blogId = req.params.blogId;

  Blog.findByIdAndUpdate({ _id: blogId }, { $set: { isApprove: true } })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Approve the Blog Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

// exports.createOneProduct = (req, res, next) => {
//   const product = createProduct(req);

//   product
//     .save()
//     .then((product) => {
//       res.status(200).json({
//         message: "Product Created Successfully!",
//         product: {
//           _id: product._id,
//           name: product.name,
//           price: product.price,
//           productImage: product.productImage,
//         },
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.getOneProduct = (req, res, next) => {
//   const id = req.params.productId;
//   Product.findById(id)
//     .select("_id name price productImage")
//     .exec()
//     .then((product) => {
//       if (product) {
//         res.status(200).json(product);
//       } else {
//         res.status(404).json({
//           message: "Product Not Found!",
//         });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.updateOneProduct = (req, res, next) => {
//   const productId = req.params.productId;
//   // const updateOps = {};
//   // for (const prop of req.body) {
//   // 	updateOps[prop.propName] = prop.propValue;
//   // }

//   Product.update({ _id: productId }, { $set: req.body })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "Updated Product Successfully!",
//         result: result,
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// function createProduct(req) {
//   return new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     price: req.body.price,
//     productImage: req.file.path,
//   });
// }
