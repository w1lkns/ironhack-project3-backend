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
  youtubeId: {
    type: String,
    required: [true, "YouTube ID is required."],
  },
  duration: {
    type: Number,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
