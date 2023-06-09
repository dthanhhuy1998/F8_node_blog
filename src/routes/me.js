var express = require('express');
var router = express.Router();

const meController = new require('../app/controllers/MeController');

// set route
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;