const mongoose = require('mongoose');

const noteSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchmea);