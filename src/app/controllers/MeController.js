const Course = require('../models/Course');
const { multipleMongooseToObject,  mongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/courses', {
                    deleteCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] me/stored/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash', { 
                    courses: multipleMongooseToObject(courses) 
                });
            })
            .catch(next);
    }
}

module.exports = new NewsController;