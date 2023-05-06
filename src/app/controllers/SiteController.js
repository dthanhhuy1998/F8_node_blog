const Course = require('../models/Course');

class SiteController {
    // [GET] /
    index(req, res) {
        try {
            Course.find({}).then(courses => {
                res.json(courses);
            });
            return;
        } catch (err) {
            console.log(err);
        };
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;