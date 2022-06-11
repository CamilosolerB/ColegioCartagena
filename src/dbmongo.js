const mongoose = require('mongoose');

const user='root';
const password='JVmORTctFlNvF0rX';
const database='Notas'
const url = `mongodb+srv://${user}:${password}@cluster0.dbwnz.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(db => console.log('Mongo is running'))
    .catch(err => console.log(err))

module.exports = mongoose;