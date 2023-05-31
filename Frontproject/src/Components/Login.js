import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { login } from "../redux/dispatch/dispatch.js";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { limpiar } from "../redux/actions/actions";
// import store from "../pruebas de redux/store/store";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    acceder: login(dispatch),
    limpiar_errores: () => dispatch(limpiar()),
  };
}

connect(mapStateToProps(), mapDispatchToProps());

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.acceder(email, password);
  };


  useEffect(() => {
    props.limpiar_errores();
  },[]) //eslint-disable-line

  return (
    <Fragment>
      {props.log.login.isLoggedIn ? (
        history.push("/inicio")
      ) : (
        <div className="login mb-5 container">
          <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={props.log.login.enable}
              type="submit"
              className="submit__btn btn btn-primary"
              id="login"
            >
              Acceder
            </button>

            <Link
              className="nav-link text-primary active"
              aria-current="page"
              to="/registro"
            >
              Crea una cuenta&nbsp;<i className="fas fa-pen"></i>
            </Link>

            {/* mostrar si algun campo esta mal en la validacion */}
            {props.log.login.error ? (
              <p className="text-danger">
                Correo electronico o contraseña erroneos
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
