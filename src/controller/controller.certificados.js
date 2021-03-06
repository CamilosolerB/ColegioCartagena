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
          <img class="u-image u-image-default u-image-1" src="data:image/jpeg;base64,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" alt="" data-image-width="284" data-image-height="177">
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
