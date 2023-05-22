const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");

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
// POST a new review
router.post("/reviews", async (req, res) => {
  try {
    const username = req.body.user;
    const user = await User.findOne({ userName: username });
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
    const reviews = await Review.find({ course: courseId }).populate("user");
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
