import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
        <div className="login">
          <h1 className="title">inicio de sesion</h1>
        <div className="card-body">
          <form>
              <label className="title">Usuario</label>
            <div className="form-group m-4">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Escriba su Usuario"
              />
            </div>
            <label className="title">Contraseña</label>
            <div className="form-group m-4">
              <input
                type="password"
                className="form-control"
                name="position"
                placeholder="Escriba su contraseña"
              />
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary mr-2">Inciar sesion</button>
            </div>
          </form>
            </div>
            </div>
    );
  }
}

export default Login;
