const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/blogs
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const blog = await Blog.create({ title, content, author: req.user._id });
    const populated = await blog.populate("author", "name");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/blogs  -> prioritized feed (backend algorithm)
router.get("/", auth, async (req, res) => {
  try {
    const following = (req.user.following || []).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Follows nobody: 10 random blogs via aggregation
    if (following.length === 0) {
      const blogs = await Blog.aggregate([
        { $sample: { size: 10 } },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            title: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            "author._id": 1,
            "author.name": 1,
          },
        },
      ]);
      return res.json(blogs);
    }

    // Follows someone: followed-user blogs first (newest first), then the rest
    const blogs = await Blog.aggregate([
      {
        $addFields: {
          priority: { $cond: [{ $in: ["$author", following] }, 0, 1] },
        },
      },
      { $sort: { priority: 1, createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          priority: 1,
          "author._id": 1,
          "author.name": 1,
        },
      },
    ]);

    res.json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
