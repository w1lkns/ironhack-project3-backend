const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  courseImage: {
    type: String,
    default: "images/course-default-image.webp",
  },
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
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
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
