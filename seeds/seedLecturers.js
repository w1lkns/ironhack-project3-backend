const mongoose = require("mongoose");
const Lecturer = require("../models/Lecturer.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

// Connect to the MongoDB database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");
    // Call the function to seed lecturers
    lecturerSeed();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const lecturerSeed = async () => {
  try {
    // Create 10 lecturers
    const lecturers = await Lecturer.create([
      {
        name: "John Smith",
        expertise: ["Web Development", "JavaScript"],
        bio: "Experienced web developer with a passion for JavaScript",
        email: "john@example.com",
      },
      {
        name: "Alice Johnson",
        expertise: ["Data Science", "Machine Learning"],
        bio: "Data science enthusiast with expertise in machine learning",
        email: "alice@example.com",
      },
      {
        name: "David Thompson",
        expertise: ["UI/UX Design", "Prototyping"],
        bio: "UI/UX designer specializing in interactive prototyping",
        email: "david@example.com",
      },
      // Add more lecturers...
    ]);

    console.log("Lecturers seeded successfully:", lecturers);

    // Disconnect from the database after seeding
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding lecturers:", error);
    // Disconnect from the database on error
    mongoose.disconnect();
  }
};

// Call the function to seed lecturers
lecturerSeed();
