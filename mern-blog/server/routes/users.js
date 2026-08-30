const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/users/following
router.get("/following", auth, async (req, res) => {
  try {
    const me = await User.findById(req.user._id).populate("following", "name");
    res.json(me.following);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/users/:id/follow
router.post("/:id/follow", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    if (String(id) === String(req.user._id)) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    await User.updateOne({ _id: req.user._id }, { $addToSet: { following: target._id } });
    const me = await User.findById(req.user._id).populate("following", "name");
    res.json({ following: me.following });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/users/:id/follow
router.delete("/:id/follow", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await User.updateOne({ _id: req.user._id }, { $pull: { following: id } });
    const me = await User.findById(req.user._id).populate("following", "name");
    res.json({ following: me.following });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
