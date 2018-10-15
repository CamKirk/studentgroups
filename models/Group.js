let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let group = new Schema({
    "groupNumber": String,
    "members": [String],
    "week": Number
});

module.exports = mongoose.model('group',group);