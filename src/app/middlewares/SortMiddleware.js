module.exports = function SortMiddleware(req, res, next) {
    // 
    res.locals._sort = {
        enabled: false,
        type: 'default',
    }

    // locals doc: https://expressjs.com/en/api.html#app.locals
    
    if(req.query.hasOwnProperty('_sort')) {
        // Way 1
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.colunm = req.query.colunm;
        
        // Way 2: Combine 2 object, replace key
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            colunm: req.query.colunm
        });
    }

    next();
}