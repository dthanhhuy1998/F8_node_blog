var express = require('express');
var router = express.Router();

const courseController = new require('../app/controllers/CourseController');

// set route
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;