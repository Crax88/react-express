const { check, validationResult } = require("express-validator");

const postRules = [
  check("text").not().isEmpty().withMessage("Text is required"),
];

const validatePost = (req, res, next) => {
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
  postRules,
  validatePost,
};
