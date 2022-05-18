const controller = {}

controller.verestudiantes=(req,res)=>{
    res.send('consulta a estudiantes')
}
controller.getestudiantes=(req,res)=>{
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
controller.inactivarestudiantes=(req,res)=>{
  if(req.session.active){
    const {id} = req.body;
    mysql.query('Update usuario Set activo=0 Where idusuarios=?',[id],(err)=>{
      if(err){
        throw err
      }
      else{
        res.json({status: "El Usuario ha sido inactivado correctamente"})
      }
    })
  }
}

controller.activarestudiantes=(req,res)=>{
  if(req.session.active){
    const {id} = req.body;
    mysql.query('Update usuario Set activo=1 Where idusuarios=?',[id],(err)=>{
      if(err){
        throw err
      }
      else{
        res.json({status: "El Usuario ha sido activado correctamente"})
      }
    })
  }
}

module.exports = controller;