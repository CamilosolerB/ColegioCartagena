const controller = {};
const mysql = require("../database");

controller.crearcurso = (req, res) => {
  if (req.session.active) {
    const { codigo, numeroest, grado } = req.body;
    const data = {
      Codigocurso: codigo,
      nodeestudiantes: numeroest,
    };
    mysql.query("Insert into curso set?", [data], (err) => {
      if (err) {
        throw err;
      } else {
        const data2 = {
          idgrado: grado,
          idcurso: codigo,
        };
        mysql.query("Insert into gradoscursos set?", [data2], (err) => {
          if (err) {
            throw err;
          } else {
            res.redirect("/admin/cursos");
          }
        });
      }
    });
  }
};
controller.asignarprofesores = (req, res) => {
  const { id } = req.params;
  mysql.query(
    "Select * from estudiante inner join estudiantecurso on (Documentoestudiante=idestudiante) Where idcurso=?",
    [id],
    (err, resbd) => {
      if (err) {
        throw err;
      } else {
        mysql.query(
          "select * from docente inner join `materias-profesor` on (Codigoprofesor=idprofmat) inner join materias on (idmatprof=Idmateria) Where idcursmat=?",
          [id],
          (err, doc) => {
            if (err) {
              throw err;
            } else {
              mysql.query("Select * from docente", (err, resbde) => {
                if (err) {
                  throw err;
                } else {
                  mysql.query("Select * from materias", (err, resp) => {
                    if (err) {
                      throw err;
                    } else {
                      const data = {
                        rol: req.session.rol,
                        foto: req.session.image,
                      };
                      res.render("admin/tablascursos", {
                        usuario: data,
                        admin: { Nombre: req.session.nombre },
                        curso: resbd,
                        profesor: doc,
                        datas: resbde,
                        materias: resp,
                      });
                    }
                  });
                }
              });
            }
          }
        );
      }
    }
  );
};

module.exports = controller;
