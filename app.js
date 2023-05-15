// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Allow server to serve images from public folder
app.use(express.static('public'));

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const courseRoutes = require("./routes/course.routes");
app.use("/api", courseRoutes);

const lecturerRoutes = require("./routes/lecturer.routes");
app.use("/api", lecturerRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const chatperRoutes = require("./routes/chapter.routes");
app.use("/api", chatperRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
