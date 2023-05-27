const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// GET user by using userPoolId
router.get("/", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOne({ userPoolId: userPoolId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// upload a userprofile picture
router.post("/upload-image", upload.single("profilePic"), async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://main--harmonious-starburst-2c594b.netlify.app');
    const userPoolId = req.user.sub;
    const filename = req.file.filename;
    const path = req.file.path;

    if (!filename || !path) {
      return res.status(400).json({ message: "No imageName or Path provided" });
    }

    // Fetch the user
    const user = await User.findOne({ userPoolId: userPoolId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user already has an image, delete it
    if (user.filename && user.filename != "profilePic-1684509679918") {
      fs.unlink(user.path, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting old image" });
        }
      });
    }

    // Update the user with new image info
    const updateImage = {
      $set: {
        filename: filename,
        path: path,
      },
    };

    const updatedUser = await User.findOneAndUpdate(
      { userPoolId: userPoolId },
      updateImage,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// update the user nickname
router.put("/change-nickname", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOneAndUpdate(
      { userPoolId: userPoolId },
      { nickname: req.body.nickname },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// get all courses this user has access to
router.get("/registered-courses", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOne({ userPoolId: userPoolId }).populate({
      path: "courses.course",
      populate: {
        path: "lecturer",
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.courses);
  } catch (error) {
    console.log(error);
  }
});

// get all wishlisted courses
router.get("/wishlist-courses", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOne({ userPoolId: userPoolId }).populate({
      path: "wishlist",
      populate: {
        path: "lecturer",
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.wishlist);
  } catch (error) {
    console.log(error);
  }
});

// add course to user wishlist
router.post("/wishlist", async (req, res) => {
  const userPoolId = req.user.sub;
  const { courseId } = req.body;

  try {
    const user = await User.findOne({ userPoolId: userPoolId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.wishlist.includes(courseId)) {
      return res.status(400).json({ error: "Course already in wishlist" });
    }

    user.wishlist.push(courseId);
    await user.save();

    res.json({ message: "Course added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add course to wishlist" });
  }
});

// remove course from user wishlist
router.delete("/wishlist", async (req, res) => {
  const userPoolId = req.user.sub;
  const { courseId } = req.body;

  try {
    const user = await User.findOne({ userPoolId: userPoolId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const index = user.wishlist.indexOf(courseId);
    if (index === -1) {
      return res.status(400).json({ error: "Course not in wishlist" });
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.json({ message: "Course removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not remove course from wishlist" });
  }
});

module.exports = router;
