const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('projects', projectSchema);