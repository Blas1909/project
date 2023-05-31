import React, { useEffect } from "react";
import { getPedidosUsuario } from "../redux/dispatch/dispatch";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return {
		log: state,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// cargar_pedidos: () => getPedidos(dispatch),
		cargar_pedidos: (id) => getPedidosUsuario(dispatch)(id),
	};
}

function Pedidos(props) {
	useEffect(() => {
		props.cargar_pedidos(props.log.login.id);
	}, []); //eslint-disable-line
	console.log(props.log.login.id);
	console.log(props.log.login);
	return (
		<div className="container-xl">
			<div className="row m-0 p-4">
				{props.log.login.pedidos.map((pedido, i) => (
					<div
						key={`pedido_${i}`}
						className="p-2 col-12 col-sm-6 col-md-4 col-xl-3"
					>
						<div className="card p-2">
							<h4>
								<b>Pedido {pedido.id_Pedido}</b>
							</h4>
							{/* <h5>Articulo: {pedidos.producto}</h5>
              <p>Cantidad: {pedidos.cantidad}</p> */}
							{pedido.productos.map((productoPedido) => (
								<div
									key={`${pedido.id_Pedido}_${productoPedido.id_Producto}`}
								>
									<div className="d-flex">
										<h5>
											<span className="badge rounded-pill bg-secondary me-2">{`${productoPedido.cantidad} x`}</span>
										</h5>
										<h5>
											{productoPedido.marca}{" "}
											{productoPedido.modelo}{" "}
										</h5>
										<h5 className="ms-auto">
											<span>
												{productoPedido.precio.toFixed(2)} €
											</span>
										</h5>
									</div>
								</div>
							))}
							{pedido.productos.length && (
								<div className="text-end">
									<hr />
									<h5>
										{" "}
										<b>{`${ pedido.productos.map((producto => producto.precio * producto.cantidad)).reduce((accumulator, current) => accumulator + current, 0)} €`}</b>
									</h5>
								</div>
							)}
						</div>	
					</div>
				))}
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);
