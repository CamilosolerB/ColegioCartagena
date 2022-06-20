const controller = {}
const nodemailer = require('nodemailer');
const mysql = require('../database')

var user = "camilosolerbu@hotmail.com"

let transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    port: 587, // port for secure SMTP
    secureConnection: false,
    tls: {
       ciphers:'SSLv3'
    },
    auth:{
        user: user,
        pass: 'Camiloesbueno'
    }
});
controller.enviarmail=(req,res)=>{
    console.log(req.session);
    let message={
        from: user,
        to: req.session.correo,
        subject: 'Atencion a las solicitud ',
        text: 'Apreciado usuario por este medio le enviamos el certificado de estudio que fue solicitado, por favor verifique que sus datos se encuentren correctos, si no es asi por favor comuniquese con el area de informatica de la institucion, agradecemos su apoyo',
        attachments: [
            {
                name: "Certificado "+req.session.nombre+" "+req.session.apellido,
                path: req.session.url
            }
        ]
    }
    transport.sendMail(message,(err)=>{
        if (err) {
            throw err
        } else {
            res.json({message: "archivo enviado con exito"});
        }
    })
}
//
module.exports = controller;