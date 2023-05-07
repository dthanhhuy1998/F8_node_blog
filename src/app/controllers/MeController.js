const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/courses', { 
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next); // catch(err => next(err))
    }
}

module.exports = new NewsController;