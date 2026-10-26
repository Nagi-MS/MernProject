const express = require('express');
const CourseReview = require('../models/CourseReview');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const all = await CourseReview.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const one = await CourseReview.findById(req.params.id);
    res.json(one);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const total = await CourseReview.countDocuments();
    const newReview = new CourseReview({ ...req.body, code: 'C' + (101 + total) });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await CourseReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await CourseReview.findByIdAndDelete(req.params.id);
    res.json({ message: 'removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;