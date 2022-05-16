const controller = {};
const mysql = require('../database');

controller.getprofesor=(req,res)=>{
    if(req.session.active){
    const {id} = req.params;
    mysql.query('Select * from docente inner join usuario on (Codigoprofesor=idusuarios) Where Codigoprofesor=?',[id],(err,resbd)=>{
        if (err) {
            throw err;
          } else {
            const data = {
              rol: req.session.rol,
              foto: req.session.image,
            };
            res.render("admin/personaindividual", {
              usuario: data,
              admin: { Nombre: req.session.nombre },
              response: resbd
            });
          }
    })
    }
}

module.exports = controller;