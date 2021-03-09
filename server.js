//PACKAGES
const express = require("express");

//DB connect
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/api/auth");
const usersRoutes = require("./routes/api/users");
const profilesRoutes = require("./routes/api/profiles");
const postsRoutes = require("./routes/api/posts");

const app = express();

//INIT Middlewares
app.use(express.json({ extended: false }));

//Mount Routers
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profile", profilesRoutes);
app.use("/api/posts", postsRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("START: ", err.message);
  }
};

const PORT = process.env.PORT || 5000;
start();
