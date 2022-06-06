const controller = {}
const nodemailer = require('nodemailer');
const mysql = require('../database')

var user = "caansobu2@gmail.com"

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: user,
        pass: '1070942659'
    }
});
controller.enviarmail=(req,res)=>{
    let message={
        from: user,
        to: req.session.emacert,
        subject: 'Email de prueba',
        text: 'Aqui te mandamos el archivo',
        attachments: [
            {
                name: "esto sera el pdf",
                path: './src/static/certificados/prueba.txt'
            }
        ]
    }

    transport.sendMail(message,(err)=>{
        if (err) {
            throw err
        } else {
            res.json({message: "el email ha sido enviado correctamente"})
        }
    })
}

module.exports = controller;