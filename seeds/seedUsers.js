const mongoose = require("mongoose");
const User = require("./../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

const usersData = [
  {
    username: "juanDoe",
    email: "juan.doe@example.com",
    hashedPassword: "hashed_password_1", // Replace with the actual hashed password
    name: "Juan Doe",
    lastAccess: new Date(),
  },
  {
    username: "doneSmith",
    email: "done.smith@example.com",
    hashedPassword: "hashed_password_2", // Replace with the actual hashed password
    name: "Done Smith",
    lastAccess: new Date(),
  },
  {
    username: "Johnson Alex",
    email: "johnson.alex@example.com",
    hashedPassword: "hashed_password_3", // Replace with the actual hashed password
    name: "Johnson Alex",
    lastAccess: new Date(),
  },
  {
    username: "sarahWilson",
    email: "sarah.wilson@example.com",
    hashedPassword: "hashed_password_4", // Replace with the actual hashed password
    name: "Sarah Wilson",
    lastAccess: new Date(),
  },
  {
    username: "wilkinsMorales",
    email: "wilkins.morales@example.com",
    hashedPassword: "hashed_password_5", // Replace with the actual hashed password
    name: "Wilkins Morales",
    lastAccess: new Date(),
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany();
    await User.insertMany(usersData);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
