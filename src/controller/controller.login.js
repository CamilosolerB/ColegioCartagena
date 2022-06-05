const controller = {};
const mysql = require('../database');

/* This is a function that is called when the user sends a request to the server. */
controller.iniciosesion=(req,res)=>{
    console.log(req.body);
    const {Correo,Clave} = req.body
    console.log(Correo);
    console.log(Clave)
   /* A query to the database. */
    mysql.query('SELECT * FROM  usuario WHERE Correo=? AND Clave=?',[Correo,Clave],(err,resbd)=>{
        if(err){
            res.json({Error : err})
        }
        else{
            if(resbd!=0){
                const activo= resbd[0].activo;
                if(activo==1){
                    /* A switch that is used to determine the type of user that is logged in. */
                    switch(resbd[0].rol){
                        case "administrador":
                            mysql.query('Select * FROM administrador Where id=?',[resbd[0].idusuarios],(err,respo)=>{
                                if(err){
                                    res.json({Error : err})
                                }
                                else{
                                    req.session.rol = resbd[0].rol
                                    req.session.image = resbd[0].foto
                                    req.session.active = true;
                                    req.session.nombre = respo[0].Nombre;
                                    req.session.identificacion = respo[0].id;
                                    res.render('admin/index',{usuario : resbd,admin:respo});
                                } 
                            });
                        break;
                        case "profesor":
                            mysql.query('Select * FROM docente Where Codigoprofesor=?',[resbd[0].idusuarios],(err,respo)=>{
                                if(err){
                                    res.json({Error : err})
                                }
                                else{
                                    req.session.rol = resbd[0].rol
                                    req.session.image = resbd[0].foto
                                    req.session.active = true;
                                    req.session.nombre = respo[0].Nombreprofesor;
                                    req.session.apellido = respo[0].Apellidoprofesor;
                                    req.session.identificacion = respo[0].Cedulaprofesor;
                                    res.render('docente/index',{usuario : resbd,admin:respo});
                                } 
                            });
                        break;
                        case "estudiante":
                            mysql.query('Select * FROM estudiante Where Documentoestudiante=?',[resbd[0].idusuarios],(err,respo)=>{
                                if(err){
                                    res.json({Error : err})
                                }
                                else{
                                    /* Saving the user's data in the session. */
                                    req.session.rol = resbd[0].rol
                                    req.session.image = resbd[0].foto
                                    req.session.active = true;
                                    req.session.nombre = respo[0].Nombre;
                                    req.session.apellido = respo[0].Apellido;
                                    req.session.identificacion = respo[0].Documentoestudiante;
                                    res.render('estudiante/index',{usuario : resbd,admin:respo});
                                } 
                            });
                        break;
                    }
                }
                else{
                    res.render('login',{Error: "Señor usuario usted se encuentra inactivo, por favor comuniquese con la institucion para mayor informacion"});
                }
            }
            else{
                res.render('login',{Error: "Usuario y/o contraseña incorrecta, por favor intente nuevamente"});
            }
        }
    });
}

controller.cerrarsesion=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
}

module.exports = controller;