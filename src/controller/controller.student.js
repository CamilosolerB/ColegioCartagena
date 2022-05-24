const controller = {}
const mysql = require('../database');

controller.verestudiantes=(req,res)=>{
    res.send('consulta a estudiantes')
}
controller.getestudiantes=(req,res)=>{
    if(req.session.active){
    const {id} = req.params;
    mysql.query('Select * from estudiante inner join usuario on (Documentoestudiante=idusuarios) Where Documentoestudiante=?',[id],(err,resbd)=>{
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