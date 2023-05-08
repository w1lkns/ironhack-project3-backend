const mongoose = require("mongoose");
const User = require("./../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

const usersData = [
  {
    username: "johnDoe",
    email: "john.doe@example.com",
    hashedPassword: "hashed_password_1", // Replace with the actual hashed password
    name: "John Doe",
    lastAccess: new Date(),
  },
  {
    username: "janeSmith",
    email: "jane.smith@example.com",
    hashedPassword: "hashed_password_2", // Replace with the actual hashed password
    name: "Jane Smith",
    lastAccess: new Date(),
  },
  {
    username: "alexJohnson",
    email: "alex.johnson@example.com",
    hashedPassword: "hashed_password_3", // Replace with the actual hashed password
    name: "Alex Johnson",
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
    username: "michaelBrown",
    email: "michael.brown@example.com",
    hashedPassword: "hashed_password_5", // Replace with the actual hashed password
    name: "Michael Brown",
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
