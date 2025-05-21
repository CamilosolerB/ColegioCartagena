const mongoose = require('mongoose');

const user='casoler';
const password='pfkt1UemVcBVzWfI';
const database='Notas'
const url = `mongodb+srv://casoler:pfkt1UemVcBVzWfI@notas.tzk5dn5.mongodb.net/?retryWrites=true&w=majority&appName=Notas`

mongoose.connect(url)
    .then(db => console.log('Mongo is running'))
    .catch(err => console.log(err))

module.exports = mongoose;