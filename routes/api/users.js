const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  userRegistrationRules,
  validateUserRegister,
} = require("../../utils/validatorsUser");
const User = require("../../models/User");

const router = Router();

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  userRegistrationRules,
  validateUserRegister,
  async (req, res) => {
    const { name, email, password, avatar } = req.body;
    console.log(req.body);
    try {
      const user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("USERS/POST", err.message);
      res.status(500).res.json({ errors: { msg: "Server error" } });
    }
  }
);

module.exports = router;
