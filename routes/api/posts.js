const { Router } = require("express");

const auth = require("../../middlewares/auth");
const { postRules, validatePost } = require("../../utils/validatorsPost");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const router = Router();

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", auth, postRules, validatePost, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ code: 1, msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    if (err.message.includes("ObjectId")) {
      return res.status(400).json({ code: 1, msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ code: 1, msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ code: 1, msg: "User not authorized" });
    }
    await post.remove();
    res.json({ code: 0, msg: "Post removed" });
  } catch (err) {
    if (err.message.includes("ObjectId")) {
      return res.status(400).json({ code: 1, msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ code: 1, msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length == 0
    ) {
      return res
        .status(400)
        .json({ code: 1, msg: "Post has not yet been liked" });
    }
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/posts/comment/:id
// @desc Comment a post
// @access Private
router.post("/comment/:id", auth, postRules, validatePost, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route DELETE api/posts/comment/:id/:comment_id
//@desc delete comment
//@access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //Check if comment exists
    if (!comment) {
      return res.status(404).json({ code: 1, msg: "Comment does not exist" });
    }
    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ code: 1, msg: "User not authorized" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
