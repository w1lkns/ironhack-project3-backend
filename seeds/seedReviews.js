const mongoose = require("mongoose");
const Review = require("../models/Review.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend-project3";

// The reviews to be seeded
const reviews = [
  {
    user: "646898e9594a6df48614c609",
    course: "6455157d4fb5de298d5a0e10",
    rating: 4,
    comment: "Great course!",
  },
  {
    user: "646898e9594a6df48614c609",
    course: "6455157d4fb5de298d5a0e0f",
    rating: 5,
    comment: "Excellent course, learned a lot!",
  },
  {
    user: "64623d67ed25e43b8b930def",
    course: "6455157d4fb5de298d5a0e10",
    rating: 3,
    comment: "Good course, but could use more practical examples.",
  },
  {
    user: "64623d67ed25e43b8b930def",
    course: "6455157d4fb5de298d5a0e0f",
    rating: 2,
    comment: "Course was a bit too fast-paced for me.",
  },
];

// Seed the reviews
const reviewSeed = async () => {
  try {
    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log("Reviews have been successfully seeded");
  } catch (error) {
    console.error("Error seeding reviews:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to the MongoDB database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");
    // Call the function to seed reviews
    reviewSeed();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
