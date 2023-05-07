const Course = require("../models/Course.model"); // Import the Course model
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

// Establish a connection to the MongoDB database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to the database.");

  // Define a function to update the courses with relevant tags
  async function updateCoursesWithTags() {
    try {
      const courses = await Course.find(); // Retrieve all courses

      // Iterate through each course and update the tags
      for (const course of courses) {
        const { name, description } = course; // Extract name and description

        // Generate tags based on the name and description
        const tags = generateTags(name, description);

        // Update the course with the new tags
        await Course.updateOne({ _id: course._id }, { tags });
      }

      console.log("Courses updated with tags successfully!");
      db.close(); // Close the database connection
    } catch (error) {
      console.error("Error updating courses with tags:", error);
      db.close(); // Close the database connection
    }
  }

  // Function to generate tags from the course name and description
  function generateTags(name, description) {
    // Split the name and description into individual words
    const nameWords = name.toLowerCase().split(" ");
    const descriptionWords = description.toLowerCase().split(" ");

    // Combine the words and remove duplicates
    const tags = Array.from(new Set([...nameWords, ...descriptionWords]));

    return tags;
  }

  // Call the function to update the courses with tags
  updateCoursesWithTags();
});
