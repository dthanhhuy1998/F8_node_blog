var express = require('express');
var router = express.Router();

const siteController = new require('../app/controllers/SiteController');

// set route
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;