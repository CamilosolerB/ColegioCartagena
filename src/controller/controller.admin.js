const controller = {};
const mysql = require('../database');

/* A function that is called when the user is logged in and is redirected to the profile page. */
controller.veradministrador=(req,res)=>{
    const id = req.session.identificacion;
    mysql.query('Select * from administrador where id=?',[id],(err,resbd)=>{
        mysql.query('Select * from usuario where idusuarios=?',[id],(err,data)=>{
            if(err){
                throw err
            }
            else{
                res.render('admin/perfil',{usuario:data, admin:resbd});
            }
        })
    })
}

module.exports = controller;