const cors = require("cors");

/*
// Configure CORS options
const corsOptions = {
  origin: "*",
};
*/

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

// Apply CORS middleware globally
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use("/uploads", express.static("uploads"));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/index")(app);

var cognitoAuth = require("./lib/cognitoAuth");
const cognitoAuthMiddleware = cognitoAuth.getVerifyMiddleware();

// 👇 Start handling routes here
const courseRoutes = require("./routes/course.routes");
app.use("/api", cognitoAuthMiddleware, courseRoutes);

const reviewRoutes = require("./routes/review.routes");
//console.log("Review routes imported:", reviewRoutes);
app.use("/api", cognitoAuthMiddleware, reviewRoutes);

const lecturerRoutes = require("./routes/lecturer.routes");
app.use("/api", cognitoAuthMiddleware, lecturerRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", cognitoAuthMiddleware, userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", cognitoAuthMiddleware, authRoutes);

const chatperRoutes = require("./routes/chapter.routes");
app.use("/api", cognitoAuthMiddleware, chatperRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", cognitoAuthMiddleware, indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
