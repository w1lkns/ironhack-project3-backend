const mongoose = require("mongoose");
const User = require("./../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

const usersData = [
  {
    userPoolId: "a76bc41a-0cdc-4758-abfb-99520f6c21cd",
    username: "Lynne",
    nickname: "Lynne",
    lastAccess: new Date(),
    filename: "profilePic-1684433746933",
    path:"uploads/profilePic-1684433746933"
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
