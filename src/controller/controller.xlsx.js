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
        await mysql.query('select * from estudiante inner join estudiantecurso on (Documentoestudiante=idestudiante) where idcurso=?',[req.session.course],(err,resbd)=>{
            const worksheet = workbook.addWorksheet(resbd[0].idcurso);
            const style = workbook.createStyle({
                font: {
                bold: true,
                  color: '#000000',
                  size: 12
                }
              });
              worksheet.cell(1,1).string('Idenficacion').style(style);

              // Set value of cell B1 to 300 as a number type styled with paramaters of style
              worksheet.cell(1,2).string('Nombre Completo').style(style);
              
              for (let index = 0; index < resbd.length; index++) {
                let cells = 2;
                let nombre  =resbd[index].Nombre +" "+ resbd[index].Apellido
                worksheet.cell(cells,1).number(resbd[index].Documentoestudiante).style(style);
                worksheet.cell(cells,2).string(nombre).style(style);
                cells++;
              }
              //a
            workbook.write('Listado.xlsx');
          
        })
        await res.download('Listado.xlsx',function(err){
            if(err){
                throw err;
            }
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
