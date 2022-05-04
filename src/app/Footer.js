import React, { Component } from "react";

class Footer extends Component {
    render(){
        return(
            <footer>
                <div className="general">
                <h2>Medios de comunicacion</h2>
                <p>Correo: privadocartagenita@gmail.com</p>
                <p>Telefonos: 3108869242</p>
                <p>Facebook: Colegio Privado Cartagenita</p>
            </div>
            <div className="pie">
                <input type="text" placeholder="nombre"/>
                <input type="text" placeholder="correo"/>
                <input type="text" placeholder="telefono"/>
                <input type="text" placeholder="ciudad"/>
                <input type="text" placeholder="descripcion"/>
                <input type="submit" placeholder="enviar" className="btnform"/>
            </div>
            </footer>
        )
    }
}

export default Footer;