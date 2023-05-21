const mongoose = require("mongoose");
const Course = require("../models/Course.model");
const Lecturer = require("../models/Lecturer.model");
require("dotenv").config();


const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

// Connect to the MongoDB database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");

    // Call the function to seed courses
    courseSeed();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const courseSeed = async () => {
  try {
    // Get the list of lecturers from the database
    const lecturers = await Lecturer.find();

    // Create courses and assign them to lecturers
    const courses = await Course.create([
      {
        name: "Web Development 101",
        description: "An introductory course on web development",
        price: 49.99,
        lecturer: lecturers[1]._id,
        chapters: [],
      },
      {
        name: "Data Science Fundamentals",
        description: "A comprehensive course covering data science concepts",
        price: 79.99,
        lecturer: lecturers[0]._id,
        chapters: [],
      },
      {
        name: "UI/UX Design Principles",
        description: "Learn the fundamental principles of UI/UX design",
        price: 39.99,
        lecturer: lecturers[2]._id,
        chapters: [],
      },
    ]);

    // Update the lecturers with their respective courses
    for (let i = 0; i < lecturers.length; i++) {
      const lecturer = lecturers[i];
      lecturer.courses = courses
        .filter(
          (course) => course.lecturer.toString() === lecturer._id.toString()
        )
        .map((course) => course._id);
      await lecturer.save();
    }

    console.log("Courses seeded successfully:", courses);

    // Disconnect from the database after seeding
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding courses:", error);
    // Disconnect from the database on error
    mongoose.disconnect();
  }
};

// Call the function to seed courses
courseSeed();
