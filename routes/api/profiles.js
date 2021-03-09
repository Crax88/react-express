const { Router } = require("express");
const request = require("request");
const config = require("config");

const auth = require("../../middlewares/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const POST = require("../../models/Post");
const {
  profileRules,
  validateProfile,
  experienceRules,
  validateExperience,
  educationRules,
  validateEducation,
} = require("../../utils/validatorsProfile");

const router = Router();

// @route GET api/profile/me
// @desc Get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ code: 1, msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/profile
//@desc Create or update user profile
//@access Private
router.post("/", auth, profileRules, validateProfile, async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  //Build socila array
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      //Create
      profile = new Profile(profileFields);
      await profile.save();
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  return res.send("Create profile");
});

// @route Get api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route Get api/profile/user/:user_id
//@desc Get  profile by user id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ code: 1, msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    if (err.message.includes("ObjectId")) {
      return res.status(400).json({ code: 1, msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route DELETE api/profile
//@desc delete profile, user @ posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //@todo - remove users posts
    await POST.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ code: 0, msg: "Account deleted" });
  } catch (err) {
    console.error(err.message);
    res, status(500).json("Server Error");
  }
});

//@route PUT api/profile/experience
//@desc add profile experience
//@access Private
router.put(
  "/experience",
  auth,
  experienceRules,
  validateExperience,
  async (req, res) => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc delete profile experience
//@access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIdx = profile.experience.findIndex(
      (item) => item._id == req.params.exp_id
    );
    if (removeIdx >= 0) {
      profile.experience = profile.experience.filter((exp) => {
        return exp._id != req.params.exp_id;
      });
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
});

//@route PUT api/profile/education
//@desc add profile education
//@access Private
router.put(
  "/education",
  auth,
  educationRules,
  validateEducation,
  async (req, res) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc Delete profile experience
//@access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIdx = profile.education.findIndex(
      (item) => item.id === req.params.edu_id
    );

    if (removeIdx >= 0) {
      profile.education = profile.education.filter(
        (edu) => edu.id !== req.params.edu_id
      );
    } else {
      res.status(400).json([{ msg: "Not found" }]);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
});

//@route GET api/profile/github/:username
//@desc Get user repos from Github
//@acces Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "GITHUB_CLIENT_ID"
      )}&client_secret=${config.get("GITHUB_SECRET")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res
          .status(404)
          .json({ code: 1, msg: "No Github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
