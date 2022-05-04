import React, { Component } from "react";

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="../img/logo.png" alt="" width="150" height="100" class="d-inline-block align-text-top" />   
                    </a>
                    <p>Colegio privado de cartagenita</p>
                    <div className="d-flex">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/nosotros">Quienes somos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/servicios">Servicios</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;