const mongoose = require('mongoose');
const {Schema} = mongoose;

const notasSchema = new Schema({},{strict: false});
module.exports =mongoose.model('notas',notasSchema);