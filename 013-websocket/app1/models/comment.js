const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: 'string',
        require: true
    },
    text: {
        type: 'string',
        require: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

const comment = mongoose.model('comment', commentSchema)

module.exports = comment;