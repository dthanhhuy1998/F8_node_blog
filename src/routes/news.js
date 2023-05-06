var express = require('express');
var router = express.Router();

const newsController = new require('../app/controllers/NewsController');

// set route
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;