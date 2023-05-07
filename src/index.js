const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

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

// HTTP Logger 
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) =>  a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Middleware
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