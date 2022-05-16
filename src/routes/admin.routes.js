const express = require('express');
const router = express.Router();
const mysql = require('../database');
const controller = require('../controller/controller.admin');
const profesor = require('../controller/controller.profesor')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//uso de multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'src/static/fotosa')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-'+req.session.identificacion + '-'+ Date.now()+'.png')
    }
})
const uploads = multer({storage});

//informacion del administrador
router.get('/',controller.veradministrador);
router.post('/',uploads.single('foto'), function (req,res){
    if(req.session.active){
    const {nombre, emapersonal} = req.body;
    mysql.query('Update administrador SET Nombre="'+nombre+'", Correo="'+emapersonal+'" WHERE id="'+req.session.identificacion+'"',(err)=>{
        if(err){
            throw err
        }
        else{
            const {email, password} = req.body;
            if(req.file===undefined){
                mysql.query('Update usuario SET Correo="'+email+'",Clave="'+password+'" Where idusuarios="'+req.session.identificacion+'"',(err)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.redirect('/admin/')
                    }
                })
            }
            else{
                try {
                    //var fotelim = req.session.image;
                    //fotelim = fotelim.replace("../","static/");
                    //fs.unlinkSync(fotelim);
                    const image = '../fotosa/' + req.file.filename
                    req.session.image = image;
                    mysql.query('Update usuario SET Correo="'+email+'",Clave="'+password+'",foto="'+image+'" Where idusuarios="'+req.session.identificacion+'"',(err)=>{
                        if(err){
                            throw err
                        }
                        else{
                            res.redirect('/admin/')
                        }
                    })
                } catch (error) {
                    res.send(error.message)
                }
            }
        }
    })
}
else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
});
router.get('/profesores',controller.profesores);
router.get('/estudiantes',controller.estudiantes);
router.get('/administradores',controller.admins);
router.get('/cursos',controller.cursos);
router.get('/certificados',controller.certificados);
//ver profesores en especifico
//router.get('/profesor/:id',profesor.getprofesor);

module.exports = router;
