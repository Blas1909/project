import React from "react";
import mapboxgl from "mapbox-gl";
import Mapa from "./mapa.js";

import g1 from "../Assets/carrusel/galeria1.jpg";
import g2 from "../Assets/carrusel/galeria2.jpg";
import g3 from "../Assets/carrusel/galeria3.jpg";
import g4 from "../Assets/carrusel/galeria4.jpg";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxhczE5MDkiLCJhIjoiY2t3bThlbG1qMXRzODJ0bWQ1b3hvMWZyeSJ9.BbBxQWs1yCEqXgEtbl96Cw";

function Inicio() {
  return (
    <div>
      {/* CARRUSEL */}
      <div
        id="demo"
        className="carousel carousel-dark slide m-5 w-70 h-70 m-auto"
        data-bs-ride="carousel"
      >
        <div className="w-50 h-50 m-auto">
          {/* Barritas indicadoras de cantidad de elementos en el carrusel */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="0"
              className="active guion"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="1"
              className="guion"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="2"
              className="guion"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="3"
              className="guion"
            ></button>
          </div>

          {/* ITEMS DEL CARRUSEL */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={g1}
                alt="Spinning"
                className="d-block w-100 img-responsive"
              />
              
            </div>
            <div className="carousel-item">
              <img
                src={g2}
                alt="Military Training"
                className="d-block w-100 img-responsive"
              />
              
            </div>
            <div className="carousel-item">
              <img
                src={g3}
                alt="Yoga"
                className="d-block w-100 img-responsive"
              />
              
            </div>
            <div className="carousel-item">
              <img
                src={g4}
                alt="Crossfit"
                className="d-block w-100 img-responsive"
              />
              
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      <div className="m-5">
        <h3>Encuentranos</h3>
        <div id="area-mapa">
          <div className="map-container">
            <Mapa />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
