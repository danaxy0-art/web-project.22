
const express = require('express');
const router = express.Router();
const deadlineController = require('../controllers/deadlineController');
const protect = require('../middleware/protect'); 

router.post('/', protect, deadlineController.addDeadline);
router.get('/', protect, deadlineController.getDeadlines);
router.delete('/:id', protect, deadlineController.deleteDeadline);

module.exports = router;