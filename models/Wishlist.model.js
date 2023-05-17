const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;
