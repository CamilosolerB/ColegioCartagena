import React from "react";
import { render } from "react-dom";

import Paginaini from "./Paginaini";
import Nosotros from "./nosotros/Nosotros";
import Servicios from "./Servicios";

render(<Paginaini/>, document.getElementById("pagina"));
render(<Servicios/>, document.getElementById("servicios"));
render(<Nosotros/>, document.getElementById('nosotros'))