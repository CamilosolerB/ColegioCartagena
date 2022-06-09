const excel = require('excel4node');
const xlsx = require('xlsx');
const controller = {};
const mysql = require('../database');
const multer = require('multer');
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
              worksheet.cell(1,2).string('Nombre Completo').style(style);
              var cells = 2;
                resbd.forEach(element => {
                  let nombre  =element.Nombre +" "+ element.Apellido
                  worksheet.cell(cells,1).number(element.Documentoestudiante);
                  worksheet.cell(cells,2).string(nombre);
                  console.log(nombre);
                  console.log(element.Documentoestudiante)
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

controller.subirarchivos=(req,res)=>{
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
          console.log(data);
           mysql.query('Select MAX(Idnota) as idnota from notas',(err,resbd)=>{
            if(err){
              throw err;
            }
            else{
              var idnota = resbd[0].idnota;
              var notas = data.map(function(info){
                var consolidado = {};
              })
              data.forEach(element=>{
                notas = {
                  Idnota: idnota
                }
                mysql.query('Insert into notas set?')
              })
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
//a
module.exports= controller;
