const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");

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
    const { user, course, rating, comment } = req.body;
    const newReview = await Review.create({
      user,
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
router.get("/reviews/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
