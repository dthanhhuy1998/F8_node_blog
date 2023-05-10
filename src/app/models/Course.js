const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

const slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type: Number, },
    name: { type: String, required: true},
    slug: { type: String, slug: 'name' },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 25, unique: true },

}, {
    _id: false, // mongoose ko can thiệp vào
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);

// Mặc định sẽ tự tăng field _id nên không cần truyền vào
CourseSchema.plugin(AutoIncrement);

CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});


module.exports = mongoose.model('Course', CourseSchema);