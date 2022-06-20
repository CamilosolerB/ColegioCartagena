const controller = {};
const mysql = require("../database");
const pdf = require('html-pdf');

controller.generarpago = (req, res) => {
  if (req.session.active) {

  }
};

controller.generarpdf=(req,res)=>{
  if (req.session.active) {
    console.log(req.session)
    const date = new Date();
    const ano = date.getFullYear();
    const dia = date.getDate();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
    const mes = date.getMonth();
//
    const content =`
    <html style="font-size: 16px;">
    <head>
      <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
      <style>
        .image{
          width: 300px;
          display: flex;
          position: relative;
          left: 200px;
        }
        .title{
          text-align: center;
        }
        .container{
          display: block;
          margin: 10%;
          margin-top: 5%;
          width: 90%;
        }
        footer{
          background-color: black;
          color: black;
          display: block;
        }
        footer p{
          color: white;
          text-align: center;
        }
      </style>
    </head>
    <body class="u-body u-xl-mode"><header class="u-clearfix u-header u-header" id="sec-8d19"><div class="u-align-left u-clearfix u-sheet u-sheet-1">
          <img class="image" src="https://scontent.feoh2-1.fna.fbcdn.net/v/t1.18169-9/14925315_358879734457685_1323928683954949289_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHBt7-2o9xf79oFh-FhrAys7PPKEl3SYn_s88oSXdJify9cRV9j4x2Baj4F2rMSq0VFv4fM1pjoMwAzOIIajY6N&_nc_ohc=jYuXsxSLQVsAX8kiWbw&_nc_ht=scontent.feoh2-1.fna&oh=00_AT944wUmNITujBsRjbVxB9OSaJpvVvlFZsXNiQg80EJG-A&oe=62D4C903">
          <h1 class="title">
            <span style="font-size: 1.5rem;">La Institución Educativa Privada De Cartagenita</span>
          </h1>
          <h4 class="title" style="font-size: 1rem;">Certifica</h4>
        </div></header>
      <section class="container" id="sec-7f84">
        <div class="u-clearfix u-sheet u-sheet-1">
          <p>El Instituto Nacional para la Educación de los Adultos, CERTIFICA que `+req.session.nombre+` `+req.session.apellido+` con Documento de identidad número `+req.session.identificacion+`, se encuentra estudiando en la institución, de acuerdo al Plan de Estudios vigente.<br>
            <br>Este certificado es expedido el día `+dia+` de `+monthNames[mes]+` de `+ano+`.
          </>
          <img class="u-image u-image-default u-image-1" src="images/firma.jpg" alt="" data-image-width="284" data-image-height="177">
          <p class="u-text u-text-default u-text-2"> Cesar Augusto Paredes García</p>
          <h6 class="u-text u-text-default u-text-3">Rector de la institucion</h6>
        </div>
      </section>
      
      
      <footer id="sec-54de">
          <p class="u-small-text u-text u-text-variant u-text-1">FACATATIVA COLOMBIA</p>
      </footer>
    </body>
  </html>
    `;
    const url = './src/static/certificados/'+req.session.identificacion+'_'+Date.now()+'.pdf';
    req.session.url = url;
    pdf.create(content).toFile(url,(err)=>{
      if (err){
        throw err;
      }
      else{
        res.redirect('/respuestas/sendemail')
      }
    })
  }
}

module.exports = controller;
