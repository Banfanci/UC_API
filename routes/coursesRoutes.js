const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();
router.route('/').get(coursesController.getCourses);

module.exports = router;
