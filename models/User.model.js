const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userPoolId:{
      type: String,
      required: [true, "User pool id is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: "/images/default-profile-image.png", // TODO upload a default profile image
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
