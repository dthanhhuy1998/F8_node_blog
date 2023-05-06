var express = require('express');
var router = express.Router();

const newsController = new require('../app/controllers/NewsController');

// set route
router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;