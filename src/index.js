/* Importing the modules that are needed for the server to work. */
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const cors = require('cors');
const mongo = require('./dbmongo');


/* Setting up a session. */
app.use(session({
    resave:true,
    secret:'1234',
    saveUninitialized:true
}));
//modo de desarrollo y uso de JSON
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routers
app.use(require('./routes/desing.routes'))
app.use('/students',require('./routes/students.routes'));
app.use('/admin',require('./routes/admin.routes'));
app.use('/profesor',require('./routes/profesor.routes'));
app.use('/cursos',require('./routes/cursos.routes'));
app.use('/respuestas',require('./routes/mensajeria.routes'));
app.use('/excusas',require('./routes/excusas.routes'));

//uso de motores de platillas (en este caso se usa ejs)
/* Telling the server to use the ejs engine to render the views. */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public'));

/* Setting up a session. */

//uso de archivos estaticos
/* Telling the server to use the public folder as the root folder for the server. */
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"static")));

/* Setting the port to 3000 if there is no port set in the environment. */
app.set('port', process.env.PORT || 3000);

//configuracion del puerto
app.listen(app.get('port'), ()=> console.log(`Server on port ${app.get('port')}`))


module.exports = app;
