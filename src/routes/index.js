const newsRouter = require('./news');
const courseRouter = require('./course');
const meRouter = require('./me');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', courseRouter);
    
    // use single page
    app.use('/', siteRouter);
}

module.exports = route;