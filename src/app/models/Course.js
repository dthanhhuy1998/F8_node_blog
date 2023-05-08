const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true},
    slug: { type: String, slug: 'name' },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 25, unique: true },

}, {
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);