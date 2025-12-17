const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructorName: String,
    price: Number,
    category: String,
    enrolledStudents: Number
});

module.exports = mongoose.model('Course', courseSchema);