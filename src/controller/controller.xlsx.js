const excel = require('excel4node');
const controller = {};
const mysql = require('../database');

controller.crearlista=(req,res)=>{
    const workbook = new excel.Workbook();
    mysql.query('select * from estudiante inner join estudiantecurso on (Documentoestudiante=idestudiante) where idcurso=?')
}

module.exports= controller;
