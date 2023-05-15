const express = require("express");
const router = express.Router();

// Import
const Course = require("../models/Course.model");
const Lecturer = require("../models/Lecturer.model");

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving courses" });
  }
});

// Get a specific course
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the course" });
  }
});

//Search for courses
router.get("/search", async (req, res, next) => {
  const { term } = req.query;

  // Use a case-insensitive regular expression to match the search term anywhere in the course name
  const regex = new RegExp(term, "i");

  try {
    const courses = await Course.find({ name: regex });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "There was a problem retrieving the courses. Please check server logs for more details.",
    });
  }
});

// Create a new course
router.post("/courses", async (req, res) => {
  try {
    // Create the course
    const course = new Course(req.body);
    await course.save();

    // Add the course to the lecturer's courses array
    const lecturer = await Lecturer.findById(req.body.lecturer);
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }
    lecturer.courses.push(course._id);
    await lecturer.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: "Error creating course" });
  }
});

// Update a course
router.put("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the course" });
  }
});

// Delete a course
router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the course" });
  }
});

module.exports = router;
