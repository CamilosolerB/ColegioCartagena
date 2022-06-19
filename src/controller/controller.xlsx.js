const excel = require('excel4node');
const xlsx = require('xlsx');
const controller = {};
const mysql = require('../database');
const multer = require('multer');
const notas = require('../models/notas')


const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, 'src/static/notas')
  },
  filename: function(req,file,cb){
      cb(null, 'listado.xlsx')
  }
})
const uploads = multer({storage});
controller.crearlista= async (req,res)=>{
    if(req.session.active){
        console.log(req.session)
        const workbook = new excel.Workbook();
        mysql.query('select * from estudiante inner join estudiantecurso on (Documentoestudiante=idestudiante) where idcurso=?',[req.session.course],async(err,resbd)=>{
            const worksheet = workbook.addWorksheet(resbd[0].idcurso);
            const style = workbook.createStyle({
                font: {
                bold: true,
                  color: '#000000',
                  size: 12
                }
              });
              worksheet.cell(1,1).string('Idenficacion').style(style);
              worksheet.cell(1,2).string('NombreCompleto').style(style);
              worksheet.cell(1,3).string('Nota1').style(style);
              worksheet.cell(1,4).string('Nota2').style(style);
              worksheet.cell(1,5).string('Nota3').style(style);
              worksheet.cell(1,6).string('Nota4').style(style);
              worksheet.cell(1,7).string('Nota5').style(style);
              worksheet.cell(1,8).string('Nota6').style(style);
              worksheet.cell(1,9).string('Promedio').style(style);
              var cells = 2;
                resbd.forEach(element => {
                  let nombre  =element.Nombre +" "+ element.Apellido
                  worksheet.cell(cells,1).number(element.Documentoestudiante);
                  worksheet.cell(cells,2).string(nombre);
                  cells++;
                });
              //a
            workbook.write('Listado.xlsx', function(err,stas){
              if(err){
                console.log(err)
              }
              else{
                res.download('Listado.xlsx',function(err){
                  if(err){
                      throw err;
                  }
              })
              }
            });
        })
    }
    else {
        res.render("login", {
          Error: "Usted no tiene las credenciales para acceder a este sitio",
        });
      }
}

controller.subirarchivos=async(req,res)=>{
  uploads.single('notas')(req,res, function(err){
    if(err){
      throw err;
    }
    else{
      try {
        const workbook = xlsx.readFile(req.file.path);
        const worksheet = workbook.SheetNames;
        //console.log(worksheet)
        if(worksheet[0] === req.session.course){
          const sheet = worksheet[0];
          const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet])
          mysql.query('Select * from materias Where Idmateria =?',[req.session.materia],(err,resbd)=>{
            if(err){
              throw err;
            }
            else{
              const aditional = {
                profesor: req.session.identificacion,
                curso: req.session.course,
                materia: req.session.materia,
                Nombremateria: resbd[0].Nombremateria
              }
              data.forEach(element => {
                const data = Object.assign(aditional,element);
                const note = new notas(data);
                note.save();
              });
              res.json({message: 'notas subidas correctamente'})
            }
          })
        }
        else{
          res.redirect('/profesor/cursos/')
        }
      } catch (error) {
        console.log(error);
      }
    }
  })
}

controller.actualizarnotas=async(req,res)=>{
  if(req.session.active){
    const {id} = req.params;
    console.log(req.body)
    await notas.findByIdAndUpdate(id,req.body)
    res.json({message: 'actualizacion correcta'})
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}

//a
module.exports= controller;

