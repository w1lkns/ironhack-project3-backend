const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Chapter name is required."],
  },
  description: {
    type: String,
    required: [true, "Chapter description is required."],
  },
  link: {
    type: String,
    required: [true, "Video link is required."],
  },
  duration: {
    type: Number,
    required: [true, "Chapter duration is required."],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
