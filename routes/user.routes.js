const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const multer = require("multer")
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });


// GET all users
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// GET user by using userPoolId
router.get("/user", async (req, res) => {
  try {
    const userPoolId = req.user.sub;
    const user = await User.findOne({userPoolId:userPoolId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create a new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update a user
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/upload-image", upload.single('profilePic'), async (req, res) => {
  try {
    const userPoolId= req.user.sub;
    console.log("userPoolId is ========>"+req.user.sub)
   
    const filename= req.file.filename;
    const path= req.file.path;
    console.log("filename is =======>" + filename)
    console.log("path is ======>"+path)

    if (!filename || !path ) {
      return res.status(400).json({ message: "No imageName or imagePath provided" });
    }
    const updateImage = {
      $set: {
        filename: filename,
        path: path
      }
    }
    const user = await User.findOneAndUpdate(
      {userPoolId:userPoolId},
      updateImage,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
