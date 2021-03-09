const { Router } = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");
const auth = require("../../middlewares/auth");
const {
  userLoginRules,
  validateUserLogin,
} = require("../../utils/validatorsUser");

const router = Router();

// @route GET api/auth
// @desc Auth user
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("API/AUTH", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post("/", userLoginRules, validateUserLogin, async (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
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
});

module.exports = router;
