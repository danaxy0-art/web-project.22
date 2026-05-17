const Course = require('../models/Course');

exports.getCourses = async (req, res) => {

  const courses = await Course.find();

  res.json(courses);

};

exports.addCourse = async (req, res) => {

  try {

    console.log(req.body);

    const { name, hours } = req.body;

    const course = await Course.create({
      name,
      hours
    });

    res.status(201).json(course);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};

exports.deleteCourse = async (req, res) => {

  await Course.findByIdAndDelete(req.params.id);

  res.json({
    success: true
  });

};

exports.updateCourse = async (req, res) => {

  const course = await Course.findByIdAndUpdate(

    req.params.id,

    req.body,

    { new: true }

  );

  res.json(course);

};