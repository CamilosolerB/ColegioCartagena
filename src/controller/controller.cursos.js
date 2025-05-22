const controller = {};
const mysql = require("../database");

controller.crearcurso = (req, res) => {
  if (req.session.active) {
    const { codigo, numeroest, grado } = req.body;

    mysql.query(
      "CALL sp_insertar_curso(?, ?, ?)",
      [codigo, numeroest, grado],
      (err) => {
        if (err) {
          throw err;
        } else {
          res.redirect("/admin/cursos");
        }
      }
    );
  }
};

controller.asignarprofesores = (req, res) => {
  const { id } = req.params;
  mysql.query(
    "SELECT * FROM `vista_est_estcur`  Where idcurso=?",
    [id],
    (err, resbd) => {
      if (err) {
        throw err;
      } else {
        mysql.query(
          "SELECT * FROM `vista_doc_docmat`  Where idcursmat=?",
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
