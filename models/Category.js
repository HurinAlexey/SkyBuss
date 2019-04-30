const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    cost: {
        type: Number,
        default: 0
    },
    devTime: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('categories', categorySchema);