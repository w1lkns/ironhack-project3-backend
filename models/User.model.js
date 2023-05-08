const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    profileImage: {
      type: String,
      default: "/images/default-profile-image.png", // TODO upload a default profile image
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    courses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        chapters: [
          {
            chapter: {
              type: Schema.Types.ObjectId,
              ref: "Chapter",
            },
            watched: {
              type: Boolean,
              default: false,
            },
            progress: {
              type: Number,
              default: 0,
              min: 0,
              max: 100,
            },
          },
        ],
        rating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
        },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    lastAccess: {
      type: Date,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
