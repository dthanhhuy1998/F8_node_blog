const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/f8_course', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to mongoose successfully.');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };