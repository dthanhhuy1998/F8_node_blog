const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

// middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

// Route
const route = require('./routes'); // auto import index.js file
const db = require('./config/db');

// Connect DB
db.connect();

// Route for static file
app.use(express.static(path.join(__dirname, 'public')));

// method override
app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);

// Test Middleware
// app.use(bacBaoVe);

// Middleware / có nhiều middleware
// 1 middleware không next là bị treo
// Muốn middleware nào chạy trước thì đặt trước
function bacBaoVe(req, res, next) {
  if(['vethuong', 'vevip'].includes(req.query.ve)) {
    req.face = 'Gach gach gach';
    return next();
  }
  // Khi không thỏa đk
  res.status(403).json({message: 'Access denied'});
}

app.get('/middleware', 
  function(req, res, next) {
    res.json({
      message: 'Access successfully.',
      face: req.face
    });
  });

// HTTP Logger 
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) =>  a + b,
    sortable: (field, sort) => {
      const sortType = field === sort.colunm ? sort.type : 'default';

      const icons = {
        default: 'bi bi-arrow-down-up',
        asc: 'bi bi-arrow-up',
        desc: 'bi bi-arrow-down'
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&colunm=${field}&type=${type}">
        <i class="${icon}"></i>
      </a>`;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.urlencoded({
  extended: true,
})); // Để xử lý form data gửi post
app.use(express.json()); // Gửi từ code js lên thì xử lý

// Route init
route(app);

// Run App
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});