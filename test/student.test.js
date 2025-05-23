const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index'); // Asegúrate de exportar tu app en index.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /students/mis_datos', () => {
  it('debería requerir autenticación', (done) => {
    chai.request(app)
      .get('/students/mis_datos')
      .end((err, res) => {
        expect(res).to.have.status(200); // Ajusta según tu lógica
        done();
      });
  });
});

describe('Rutas de estudiantes - autenticación requerida', () => {
  it('GET /students/mis_datos muestra login si no hay sesión', (done) => {
    chai.request(app)
      .get('/students/mis_datos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Usted no tiene las credenciales para acceder a este sitio');
        done();
      });
  });

  it('GET /students/excusas muestra login si no hay sesión', (done) => {
    chai.request(app)
      .get('/students/excusas')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Usted no tiene las credenciales para acceder a este sitio');
        done();
      });
  });

});