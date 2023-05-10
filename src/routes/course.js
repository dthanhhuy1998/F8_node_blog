var express = require('express');
var router = express.Router();

const courseController = new require('../app/controllers/CourseController');

// set route
router.get('/create', function(req, res, next) {
    if(req.query.ve === 'vip') return next();
    res.status(404).json({message: 'Access denied'});    
}, courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;