
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const protect = require('../middleware/protect');

// مسار إضافة كورس جديد: POST /api/courses
router.post('/', protect, courseController.addCourse);

// مسار عرض كورسات الطالب: GET /api/courses
router.get('/', protect, courseController.getCourses);

// مسار حذف كورس: DELETE /api/courses/:id
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;