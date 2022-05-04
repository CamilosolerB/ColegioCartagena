import React,{Component} from 'react'

class Carousel extends Component {
    render(){
        return(
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../../img/foto.jpg" className="d-block w-100" id='image' alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Demostrando superioridad</h5>
              <p>Buscamos el progreso y el desarrollo para una mejor Facatativa</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="../../img/grupo.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Conocenos mas y da un paso hacia adelante</h5>
              <p>Demostrando calidad en nuestra educacion para los jovenes del siglo XXI</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="../../img/si.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Ejemplo de calidad</h5>
              <p>Siempre buscamos que nuestros estudiantes mejoren y alcancen sus expectativas, !conoce mas!</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
        )
    }
}

export default Carousel;