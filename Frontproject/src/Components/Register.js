import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { registro } from "../redux/dispatch/dispatch.js";
// import store from "../pruebas de redux/store/store";
import { limpiar } from "../redux/actions/actions.js";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    crearuser: registro(dispatch),
    limpiar_errores: () => dispatch(limpiar()),
  };
}
connect(mapStateToProps(), mapDispatchToProps());

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let history = useHistory();

  // ESTO TAMBIEN ESTA EN DISPATCH.JS
  // async function register() {
  //   const user = { name, email, password };
  //   fetch("https://localhost:7255/users", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //   });
  // }

  useEffect(() => {
    props.limpiar_errores();
  }, []); //eslint-disable-line

  const [contras, setContras] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setContras(true)
      props.limpiar_errores();
    } else {
      setContras(false);
      props.crearuser(name, email, password);
    }
  };

  return (
    <Fragment>
      {props.log.login.registrado ? (
        history.push("/login")
      ) : (
        <div className="login mb-5">
          <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
            <h1>Bienvenido</h1>
            <input
              type="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />

            <button
              disabled={props.log.login.enable}
              type="submit"
              className="submit__btn btn btn-primary"
            >
              Crear cuenta
            </button>

            <Link
              className="nav-link text-primary active"
              aria-current="page"
              to="/login"
            >
              ¿Ya tienes cuenta?&nbsp;<i className="fas fa-user"></i>
            </Link>

            {/* mostrar si algun campo esta mal en la validacion */}

            {contras ? (
              <p className="text-danger">Las contraseñas no coinciden</p>
            ) : (
              ""
            )}
            {props.log.login.error ? (
              <p className="text-danger">El correo electronico ya esta en uso</p>
            ) : (
              ""
            )}
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
