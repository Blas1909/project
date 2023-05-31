import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { cargar_pedido } from "../redux/actions/actions";
import { Link } from "react-router-dom";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    detalles: (id, cantidad) => dispatch(cargar_pedido(id, cantidad)),
  };
}

function ProductoDetail(props) {
  let [valorInput, setValorInput] = useState(1);

  useEffect(() => {}, []); //eslint-disable-line

  function sumar() {
    if (valorInput !== props.log.login.productos[0].stock) {
      setValorInput((valorInput += 1));
    }
  }
  function restar() {
    if (valorInput !== 0) {
      setValorInput((valorInput -= 1));
    }
  }

  return (
    <div>
      {typeof props.log.login.productos === "undefined" ? (
        <div>
          <h2 className="display-1 text-center p-5 m-5">
            Cargando producto...
          </h2>
        </div>
      ) : (
        <div>
          {props.log.login.productos.map((producto) => (
            <div
              className="card my-5"
              key={producto.id}
              style={{ width: "50%", margin: "auto" }}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/api/file?imageUrl=${producto.fileName}`}
                className="card-img-top img-fluid"
                alt="imagen del producto"
              ></img>
              <div className="card-body">
                <h5 className="card-title">
                  {producto.marca} {producto.descripcion}
                </h5>
                <p className="card-text">{producto.precio} €</p>
                <p className="card-text">¡Quedan {producto.stock} en stock!</p>
                <p className="card-text">
                  <button onClick={() => restar()}>-</button>
                  <input
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={valorInput}
                    onKeyDown={(event) => {
                      event.preventDefault();
                    }}
                  />

                  <button onClick={() => sumar()}>+</button>
                </p>
                <p>
                  {producto.stock > 0 ? (
                    <Link
                      className="btn btn-warning"
                      onClick={() => props.detalles(producto.id, valorInput)}
                      to="/tienda"
                    >
                      Añadir al carrito
                    </Link>
                  ) : (
                    <button href="#" className="btn btn-warning" disabled>
                      Producto agotado
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetail);
