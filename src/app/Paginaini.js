import React, { Component } from "react";
import Carousel from "./inicio/Carousel";
import Footer from "./Footer";
import Navbar from "./inicio/Navbar";
import Login from "./login";
import Textual from "./Textual";

class Paginaini extends Component {
    render(){
        return(
            <div>
                <Navbar></Navbar>
                <div className="container">
                    <section className="section">
                        <article className="col m-4">
                            <Carousel></Carousel>
                        </article>
                    </section>
                    <aside className="aside">
                        <Login></Login>
                    </aside>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Paginaini;