const express = require("express");
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");


// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/", async (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  // // Send back the token payload object containing the user data
  // res.status(200).json(req.payload);

  try {
    // check if this user is added in mongoDB, otherwise create a new user
    const userCreated = await User.findOne({ userPoolId: req.user.sub });
    console.log(userCreated);
    if (!userCreated) {
      const newUser = User.create({
        userPoolId: req.user.sub,
        username: req.user.username,
        nickname: req.user.username,
      });
      console.log("new user created", newUser);
    } else {
      console.log("user already exists");
    }
  } catch (err) {
    console.log(err);
  }

  res.send(
    "Successfully verified JWT token. Extracted information: " +
      JSON.stringify(req.user)
  );
});

module.exports = router;
