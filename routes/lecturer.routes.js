const express = require("express");
const router = express.Router();
const Lecturer = require("../models/Lecturer.model");
const Course = require("../models/Course.model");

// Get all lecturers
router.get("/lecturers", async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a specific lecturer with populated courses
router.get("/lecturers/:id", async (req, res) => {
  try {
    let lecturer = await Lecturer.findById(req.params.id);
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }

    console.log("Course IDs:", lecturer.courses); // Log the course IDs

    // Fetch courses directly using the course IDs
    try {
      for (let courseId of lecturer.courses) {
        const course = await Course.findById(courseId);
        console.log(course); // Log the fetched course document
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    // Manually populate courses
    const courses = await Course.find({ _id: { $in: lecturer.courses } });
    lecturer = lecturer.toObject(); // Convert the lecturer document to a plain JavaScript object
    lecturer.courses = courses; // Replace the course ids with the fetched course documents

    res.json(lecturer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the lecturer" });
  }
});

// Create a new lecturer
router.post("/lecturers/", async (req, res) => {
  try {
    const lecturer = new Lecturer(req.body);
    const savedLecturer = await lecturer.save();
    res.status(201).json(savedLecturer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a lecturer by ID
router.put("/lecturers/:id", async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }
    res.json(lecturer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a lecturer by ID
router.delete("/lecturers/:id", async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }
    res.json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
