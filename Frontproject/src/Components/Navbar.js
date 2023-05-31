import logo from "../Assets/logo/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { salir } from "../redux/dispatch/dispatch.js";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

const handleLogout = (e) => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  salir();
};

connect(mapStateToProps());

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark p-3 justify-content-center text-warning">
      <div className="container-fluid">
        <Link className="navbar-brand p-0 m-0" to="/inicio">
          <img className="navbar-brand" src={logo} alt="icono del sitio web" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <i className="fas fa-bars" style={{ color: "#fff" }}></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item m-2">
              <Link
                to={"/inicio"}
                style={{ textDecoration: "none", color: "orange" }}
              >
                INICIO <i className="fa-solid fa-house"></i>
              </Link>
            </li>

            <li className="nav-item m-2">
              <Link
                to={"/tienda"}
                style={{ textDecoration: "none", color: "orange" }}
              >
                TIENDA <i className="fa-solid fa-shop"></i>
              </Link>
            </li>

            <li className="nav-item m-2">
              {props.log.login.isLoggedIn ? (
                <Link
                  to={"/login"}
                  onClick={(e) => handleLogout(e)}
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  LOGOUT <i className="fa-solid fa-door-open"></i>
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  LOGIN <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </li>
            <li className="nav-item m-2">
              {props.log.login.isAdmin ? (
                <Link
                  to={"/consultas"}
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  CONSULTAS <i className="fa-solid fa-sheet-plastic"></i>
                </Link>
              ) : (
                <Link
                  to={"/pedidos"}
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  MIS PEDIDOS <i className="fa-solid fa-truck"></i>
                </Link>
              )}
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item m-2">
              <Link
                to={"/carrito"}
                style={{ textDecoration: "none", color: "orange" }}
              >
                Carrito <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default connect(mapStateToProps)(Navbar);
