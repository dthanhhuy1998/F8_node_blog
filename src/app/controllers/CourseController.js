const Course = require('../models/Course');
const {  mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /khoa-hoc/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // use lib mongoose-sequence to auto increment id
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [GET] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        // use soft delete from soft-delete plugin
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
 
    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                // Xóa tất cả những thằng nằm trong list courseIds[]
                Course.delete({ _id: { $in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;
            default:
                res.json({ message: 'Action is invalid!'});
                break;
        }
    }
}

module.exports = new CourseController;