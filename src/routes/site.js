var express = require('express');
var router = express.Router();

const siteController = new require('../app/controllers/SiteController');

// set route
router.use('/search', siteController.search);
router.use('/', siteController.index);

module.exports = router;