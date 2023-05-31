import React, { useEffect } from "react";
import { getContactos } from "../redux/dispatch/dispatch";
import { connect } from "react-redux";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cargar_contactos: () => getContactos(dispatch),
  };
}

function Consultas(props) {
  useEffect(() => {
    props.cargar_contactos();
  }, []); //eslint-disable-line

  return (
    <div className="container-xl">
      <div className="row m-0 p-0">
        {props.log.login.contactos.map((contactos) => (
          <div className="row" key={contactos.id}>
            <div style={{width : "100%", border : "solid 1px", margin : "1%"}}>
              <h4>{contactos.motivo}</h4>
              <h5>{contactos.descripcion}</h5>
              <p>Consulta enviada por: {contactos.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Consultas);
