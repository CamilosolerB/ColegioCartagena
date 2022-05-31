const mysql = require("../database");
const controller = {}
const fs = require('fs');

controller.verpdfprofesor=(req,res)=>{
    if(req.session.active){
        const {id} = req.params;
        mysql.query('Select Documentopdf From excusas Where id=?',[id],(err,resbd)=>{
            if (err) {
                res.send(err)
            } else {
                res.download(resbd[0].Documentopdf,function(err){
                    if(err){
                        throw err
                    }
                })
            }
        })
    }
    else {
        res.render("login", {
          Error: "Usted no tiene las credenciales para acceder a este sitio",
        });
      }
}

module.exports = controller;