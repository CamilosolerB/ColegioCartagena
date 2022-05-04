import { Component } from 'react';
import Footer from "../Footer";
import Navbar from "../inicio/Navbar";

class Nosotros extends Component{
    render(){
        return(
            <div>
            <Navbar></Navbar>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorem nobis velit sit harum maiores eaque quod recusandae iste quos, veniam facilis fugiat consequuntur architecto voluptates sunt nisi eveniet suscipit!</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorem nobis velit sit harum maiores eaque quod recusandae iste quos, veniam facilis fugiat consequuntur architecto voluptates sunt nisi eveniet suscipit!</p>
            <p>Lore, ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorem nobis velit sit harum maiores eaque quod recusandae iste quos, veniam facilis fugiat consequuntur architecto voluptates sunt nisi eveniet suscipit!</p>
            <Footer></Footer>
            </div>
        )
    }
}

export default Nosotros;