const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./courses');
const changes = 1;
mongoose.connect('mongodb://localhost:27017/lab7');
const app = express();
app.use(bodyParser.json());

// Create a new course
app.post('/course', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//get all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a course by title
app.get('/course/:title', async (req, res) => {
    try {
        const course = await Course.findOne({ title: req.params.title });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a course by title
app.put('/course/:title', async (req, res) => {
    try {
        const course = await Course.updateOne({ title: req.params.title }, req.body);
        res.json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a course by title
app.delete('/course/:title', async (req, res) => {
    try {
        const course = await Course.deleteOne({ title: req.params.title });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
