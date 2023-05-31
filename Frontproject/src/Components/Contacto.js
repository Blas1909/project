import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function Contacto(props) {
  const [motivo, setMotivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(props.log.login.email);
  }, []); //eslint-disable-line

  const form = document.getElementById("form_consulta");

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.reset();
  };

  function postConsulta() {
    const consulta = { motivo, descripcion, email };
    fetch(process.env.REACT_APP_API_URL+"/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consulta),
    });
  }

  return (
    <div>
      <form
        id="form_consulta"
        className="row g-3 needs-validation"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="col-md-10">
          <label htmlFor="validationCustom01" className="form-label">
            Motivo de su consulta
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            placeholder="Localizacion, clases, pagos..."
            required
            onChange={(e) => setMotivo(e.target.value)}
          />
          <div className="invalid-feedback">
            Por favor introduzca el motivo de su consulta
          </div>
        </div>

        <div className="col-md-10">
          <label htmlFor="validationCustom02" className="form-label">
            Descripcion
          </label>
          <textarea
            className="form-control"
            id="validationCustom02"
            required
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <div className="invalid-feedback">
            Por favor introduzca una descripcion del problema para ayudarnos a
            resolverlo
          </div>
        </div>
        <div className="col-12 jus">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => postConsulta()}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect(mapStateToProps)(Contacto);
