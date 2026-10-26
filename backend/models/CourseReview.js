const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  code: String,
  courseName: { type: String, required: true },
  courseDuration: { type: String, default: 'Not given' },
  remarks: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('CourseReview', reviewSchema);