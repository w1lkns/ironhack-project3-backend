const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  previewVideo: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Course price is required."],
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
    required: [true, "Course lecturer is required."],
  },
  registeredNumber: {
    type: Number,
    default: 0,
  },
  wishlistNumber: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
