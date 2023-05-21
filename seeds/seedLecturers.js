const mongoose = require("mongoose");
const Lecturer = require("../models/Lecturer.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

// Connect to the MongoDB database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");
    lecturerSeed();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const lecturerSeed = async () => {
  try {
    const lecturers = await Lecturer.create([
      {
        name: "DiogoBarros",
        expertise: ["Web Development", "JavaScript"],
        bio: "With extensive experience in web development, Diogo Barros possesses a deep-rooted passion for JavaScript. Specializing in creating robust, intuitive, and interactive web applications, Diogo dedicates his efforts to modern coding practices and efficient methodologies. He believes in constant learning to stay updated with rapidly evolving web technologies.",
        email: "Diogo.Barros@gmail.com",
        profileImage: "https://ca.slack-edge.com/T04C6NT0JJD-U04BDHHDE5D-c1b6b87a6127-192"

      },
      {
        name: "DanielCalvente",
        expertise: ["Data Science", "Machine Learning"],
        bio: "A data science enthusiast, Daniel Calvente has honed his skills in machine learning to provide innovative solutions to complex problems. Leveraging data-driven insights and advanced predictive models, Daniel helps businesses optimize their operations and decision-making processes. His dedication lies in unfolding the hidden patterns in data to drive strategic business growth.",
        email: "Daniel.Calvente@gmail.com",
        profileImage: "https://ca.slack-edge.com/T04C6NT0JJD-U04C6NYDVR7-935ebf275d41-512"
      },
      {
        name: "JaimeLaureano",
        expertise: ["UI/UX Design", "Prototyping"],
        bio: "As a UI/UX designer, Jaime Laureano specializes in crafting user-centric designs and interactive prototypes. His approach combines aesthetic sensitivity with a deep understanding of user behavior to create intuitive and engaging digital experiences. With a knack for detail and a keen eye for design, Jaime strives to enhance user interaction and satisfaction in every project he undertakes.",
        email: "Jaime.Laureano@gmail.com",
        profileImage: "https://ca.slack-edge.com/T04C6NT0JJD-U04BDHHLW23-8bf1c0b5027c-192"
      },
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
