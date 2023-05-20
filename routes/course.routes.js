const express = require("express");
const router = express.Router();

// Import
const Course = require("../models/Course.model");
const Chapter = require("../models/Chapter.model");

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
    const course = await Course.findById(req.params.id).populate("chapters");
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

// Create a new course
router.post("/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: "Failed to create the course" });
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

// Create a new chapter and add it to a course
router.post("/courses/:courseId/chapters", async (req, res) => {
  console.log("Attempting to add chapter to course");
  console.log("Request body:", req.body);
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const chapter = new Chapter(req.body);
    chapter.course = courseId;
    await chapter.save();
    course.chapters.push(chapter);
    await course.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Failed to add chapter to course" });
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

module.exports = router;
