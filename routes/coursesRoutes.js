const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.route('/').get(coursesController.getCourses);

router.route('/vacancy').get(coursesController.getVacancy);

router.route('/requeriments').get(coursesController.getRequeriments);

module.exports = router;
