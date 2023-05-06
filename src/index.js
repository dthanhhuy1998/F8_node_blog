const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

// Route
const route = require('./routes'); // auto import index.js file

// Route for static file
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger 
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Middleware
app.use(express.urlencoded({
  extended: true,
})); // Để xử lý form data gửi post
app.use(express.json()); // Gửi từ code js lên thì xử lý

// Route init
route(app);

// Run App
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});