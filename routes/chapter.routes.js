const express = require("express");
const router = express.Router();

// Import Chapter model
const Chapter = require("../models/Chapter.model");

// Get all chapters
router.get("/chapters", async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving chapters" });
  }
});

// Get a specific chapter
router.get("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the chapter" });
  }
});

// Create a new chapter
router.post("/chapters", async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Failed to create the chapter" });
  }
});

// Update a chapter
router.put("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the chapter" });
  }
});

// Delete a chapter
router.delete("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the chapter" });
  }
});

module.exports = router;
