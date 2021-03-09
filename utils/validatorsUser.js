const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userRegistrationRules = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exists");
        }
        return Promise.resolve();
      } catch (err) {
        console.log("USERREGRULES", err.message);
        return Promise.reject("Server error");
      }
    })
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6, max: 56 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage(
      "Password must be minimum 6 characters, at least one letter, one number and one special character"
    )
    .trim(),
  check("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .trim(),
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim(),
];

const validateUserRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.value, msg: err.msg }));

  return res.status(400).json({ code: 1, errors: extractedErrors });
};

const userLoginRules = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("Email or password is incorrect");
        }
        req.user = user;
        return Promise.resolve();
      } catch (err) {
        console.log("USERLOGINRULES", err.message);
        return Promise.reject("Server error");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return Promise.reject("Email or password is incorrect");
      const check = await bcrypt.compare(value, user.password);
      if (!check) {
        return Promise.reject("Email or password is incorrect");
      }
      return Promise.resolve();
    }),
];

const validateUserLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.value, msg: err.msg }));
  return res.status(400).json({ code: 1, errors: extractedErrors });
};

module.exports = {
  userRegistrationRules,
  validateUserRegister,
  userLoginRules,
  validateUserLogin,
};
