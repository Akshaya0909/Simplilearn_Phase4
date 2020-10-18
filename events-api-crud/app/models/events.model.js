const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: String,
    description: String,
    date:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);