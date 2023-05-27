const express = require("express");
const router = express.Router();
const Lecturer = require("../models/Lecturer.model");

router.get("/lecturer/:username", async (req, res) => {
  try {
    const currentUser = req.params.username;
    console.log(currentUser);
    const lecturer = await Lecturer.findOne({ name: currentUser });
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }
    res.json(lecturer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single lecturer
router.get("/lecturer", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const lecturer = await Lecturer.findOne({
      userPoolId: userPoolId,
    }).populate("courses");
    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }
    res.json(lecturer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
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
