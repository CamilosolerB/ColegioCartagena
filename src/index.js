const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

//modo de desarrollo y uso de JSON
app.use(morgan('dev'));
app.use(express.json());

//routers
app.use(require('./desing.routes'))
app.use('/students',require('./routes/students.routes'))

//uso de archivos estaticos
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"static")));

app.set('port', process.env.PORT || 3000);

//configuracion del puerto
app.listen(app.get('port'), ()=> console.log(`Server on port ${app.get('port')}`))
