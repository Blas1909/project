import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

connect(mapStateToProps());

function Footer(props) {
  return (
    <div>
      <footer className="footer bg-dark text-center">
        <div className="continer p-4">
          <section className="m-3">
            <a
              href="https://www.facebook.com/"
              className="btn btn-outline-light p-2 m-3"
            >
              <i className="bi bi-facebook m-1"></i>Nuestro Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              className="btn btn-outline-light p-2 m-3"
            >
              <i className="bi bi-instagram m-1"></i>Nuestro Instagram
            </a>
            <a
              href="https://twitter.com/"
              className="btn btn-outline-light p-2 m-3"
            >
              <i className="bi bi-twitter m-1"></i>Nuestro Twitter
            </a>
          </section>

          <section className="m-3">
            {props.log.login.isLoggedIn ? (
              <Link
                className="btn btn-lg btn-outline-light m-3 p-2"
                to="/contacto"
              >
                <span>CONTACTANOS</span>
              </Link>
            ) : (
              <Link
                className="btn btn-lg btn-outline-light m-3 p-2"
                to="/login"
              >
                <span>CONTACTANOS</span>
              </Link>
            )}
          </section>
          {/*Footer Bottom*/}
          <div className="footer-bottom p-2">
            <p className="text-xs-center text-white">
              &copy;{new Date().getFullYear()} BenidormFitnessCenter - todos los
              derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);
