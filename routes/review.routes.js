const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Course = require("../models/Course.model");

// GET review
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new review
router.post("/reviews", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOne({ userPoolId: userPoolId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { course, rating, comment } = req.body;
    const newReview = await Review.create({
      user: user._id,
      course,
      rating,
      comment,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET all reviews for a specific course
router.get("/reviews/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    let query = { course: courseId };
    if (userId) {
      query = { ...query, user: userId };
    }

    const reviews = await Review.find(query).populate("user");
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
