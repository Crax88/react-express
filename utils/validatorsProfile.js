const { check, validationResult } = require("express-validator");

const profileRules = [
  check("status").not().isEmpty().withMessage("Status is required"),
  check("skills").not().isEmpty().withMessage("Skills are reruired"),
];

const validateProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.value || "", msg: err.msg }));
  return res.status(400).json({ code: 1, errors: extractedErrors });
};

const experienceRules = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("company").not().isEmpty().withMessage("Company is required"),
  check("from").not().isEmpty().withMessage("From date is required"),
];

const validateExperience = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.value || "", msg: err.msg }));
  return res.status(400).json({ code: 1, errors: extractedErrors });
};

const educationRules = [
  check("school").not().isEmpty().withMessage("School is required"),
  check("degree").not().isEmpty().withMessage("Degree is required"),
  check("fieldofstudy")
    .not()
    .isEmpty()
    .withMessage("Field of study is required"),
  check("from").not().isEmpty().withMessage("From date is required"),
];

const validateEducation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.value || "", msg: err.msg }));
  return res.status(400).json({ code: 1, errors: extractedErrors });
};

module.exports = {
  profileRules,
  validateProfile,
  experienceRules,
  validateExperience,
  educationRules,
  validateEducation,
};
