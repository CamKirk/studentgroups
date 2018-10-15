let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let student = new Schema({
    "firstName": String,
    "lastName": String,
    "fName": String,
    "lName": String,
    "groups": [{type: Schema.Types.ObjectId, ref:"group"}]
});

module.exports = mongoose.model('student',student);