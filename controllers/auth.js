const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const PasswordReset = require("../models/passwordreset");
const sendmail = require("../helper/nodemailer");
const passwordreset = require("../models/passwordreset");

module.exports = {
  signUp: async (req, res, next) => {
    const checkExistingUser = await User.findOne({ email: req.body.email });

    if (checkExistingUser) {
      return res.status(500).json({
        message: "Email already exists",
      });
    } else {
      const userRole = await Role.findOne({ role: req.body.role });

      if (!userRole) {
        return res.status(500).json({
          message: "this role dosn't exisits",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          } else {
            const user = User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: hash,
              role: userRole._id,
            });

            user
              .save()
              .then((result) => {
                const rand = () => {
                  return Math.random().toString(36).substr(2);
                };

                const token = () => {
                  return rand() + rand() + rand() + rand();
                };

                const verifyUrl =
                  process.env.FRONTEND_URL +
                  "/verify?user_id=" +
                  result._id +
                  "&token=" +
                  token();

                let mailOptions = {
                  from: process.env.EMAIL,
                  to: req.body.email,
                  subject: "Verify your email",
                  html:
                    "<p>please click on the url to verify your email  the url is</p><br><a href='" +
                    verifyUrl +
                    "'>Reset Password</a>",
                };

                sendmail(mailOptions);

                res.status(201).json({
                  message: "User Created Sucessfully",
                  data: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: error.message,
                });
              });
          }
        });
      }
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.body.user_id });

      if (user.is_verified === 1) {
        return res.status(500).json({
          message: "Email already verified",
          data: user,
        });
      } else {
        user.updateOne({ is_verified: 1 }).then((result) => {
          res.status(200).json({
            message: "Email Verified sucessfully Please login",
            data: user,
          });
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  forgotPassword: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const rand = () => {
        return Math.random().toString(36).substr(2);
      };

      const token = () => {
        return rand() + rand() + rand() + rand();
      };

      const resetToken = token();

      const resetUrl =
        process.env.FRONTEND_URL + "/resetPassword?token=" + resetToken;

      let mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reset your email",
        html:
          "<p>please click on the url to reset your password the url is</p><br><a href='" +
          resetUrl +
          "'>Reset Password</a>",
      };

      sendmail(mailOptions);

      const passwordReset = PasswordReset({
        _id: new mongoose.Types.ObjectId(),
        user_id: user._id,
        token: resetToken,
      });

      passwordReset
        .save()
        .then((result) => {
          res.status(200).json({
            message: "please check your email url sent to reset your password",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  },

  resetPassword: async (req, res, next) => {
    const passwordReset = await PasswordReset.findOne({
      token: req.body.token,
    });
    if (passwordReset) {
      const user = await User.findOne({ _id: passwordReset.user_id });

      if (user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          } else {
            user
              .updateOne({ password: hash })
              .then((result) => {
                passwordReset.deleteOne();

                res.status(201).json({
                  message: "password updated sucessfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: error.message,
                });
              });
          }
        });
      } else {
        return res.status(500).json({
          message: "something went wrong",
        });
      }
    } else {
      return res.status(500).json({
        message: "token dose not match please check it again",
      });
    }
  },

  logIn: async (req, res, next) => {
    const populateQuery = [{ path: "role", select: "_id label  role" }];

    const user = await User.findOne({ email: req.body.email }).populate(
      populateQuery
    );
    if (user) {
      if (user.is_verified === 0) {
        return res.status(500).json({
          message: "please verify your email first",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        if (result) {
          res.userInfo = user;
          next();
        } else {
          return res.status(404).json({
            message: "email or password dosn't match please check again",
          });
        }
      });
    } else {
      return res.status(404).json({
        message: "email or password dosn't match please check again",
      });
    }
  },
};
