const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "/images/default-profile-image.png", // TODO find a default profile image
  },
  expertise: [
    {
      type: String,
      required: true,
    },
  ],
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  socialMedia: {
    website: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
});

const Lecturer = mongoose.model("Lecturer", lecturerSchema);

module.exports = Lecturer;
