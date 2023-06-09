const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import Chapter model
const Chapter = require("../models/Chapter.model");
const Course = require("../models/Course.model");
const User = require("../models/User.model");

// Get all chapters
router.get("/chapters", async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving chapters" });
  }
});

// Get a specific chapter
router.get("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the chapter" });
  }
});

// Create a new chapter
router.post("/chapters", async (req, res) => {
  try {
    const youtubeId = extractYouTubeId(req.body.link); // function to get YouTube ID from link
    const duration = await getYouTubeVideoDuration(youtubeId); // function to get video duration from YouTube API
    const chapter = await Chapter.create({ ...req.body, youtubeId, duration });
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Failed to create the chapter" });
  }
});

// Function to extract YouTube ID from a link
function extractYouTubeId(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
}

// Function to get YouTube video duration
async function getYouTubeVideoDuration(youtubeId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtubeId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const duration = response.data.items[0].contentDetails.duration;
    return convertISO8601ToSeconds(duration); // function to convert ISO 8601 duration to seconds
  } catch (error) {
    console.error("Error fetching YouTube video duration", error);
    return null;
  }
}

// Function to convert ISO 8601 duration to seconds
function convertISO8601ToSeconds(input) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours = 0,
    minutes = 0,
    seconds = 0,
    totalseconds;

  if (reptms.test(input)) {
    var matches = reptms.exec(input);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600 + minutes * 60 + seconds;
  }

  return totalseconds;
}

// Update a chapter
router.put("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the chapter" });
  }
});

// Delete a chapter
router.delete("/chapters/:id", async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the chapter" });
  }
});

// Mark chapter as watched or unwatched

router.put(
  "/:courseId/chapters/watchChapter/:chapterId",
  async (req, res) => {
    try {
      const userPoolId = req.user.sub;
      const { courseId, chapterId } = req.params;

      const user = await User.findOne({ userPoolId: userPoolId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
     
      // find the course in user's courses
      const userCourse =
        user.courses &&
        user.courses.find(
          (course) => course.course && course.course == courseId
        );
      if (!userCourse) {
        return res.status(404).json({ message: "Course not found" });
      }

      // find the chapter in user's course
      const userChapter =
        userCourse &&
        userCourse.chapters &&
        userCourse.chapters.find(
          (chapter) =>
            chapter && chapter.chapter && chapter.chapter.equals(chapterId)
        );

      if (!userChapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }

      // update the watched status
      userChapter.watched = !userChapter.watched;

      // update the progress number of registered course
      const watchedChapters = userCourse.chapters.filter(
        (chapter) => chapter.watched
      ).length;


      // get chapter number of the course
      userCourse.progress = (watchedChapters /userCourse.chapters.length * 100)

      await user.save();

      res.json({ message: "Watched status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

module.exports = router;
