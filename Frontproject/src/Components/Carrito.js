import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import {
	detalle_producto,
	quitar_producto_carrito,
} from "../redux/actions/actions";
import tarjetas from "../Assets/tarjetas.png";
import { useEffect } from "react";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
	return {
		log: state,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		detalles: (id) => dispatch(detalle_producto(id)),
		quitar: (id) => dispatch(quitar_producto_carrito(id)),
	};
}

//LISTA DE LOS DIFERENTES ERRORES QUE PUEDEN SUCEDER AL VALIDAR EL FORMULARIO DE COMPRA
const Errores = {
	DIRECCION_NULL: "Por favor introduce tu direccion",
	TARJETA_INVALID: "La tarjeta introducida no es valida",
	NOMBRE_NULL: "Debes introducir tu nombre",
	DATE_INVALID: "La fecha no es válida",
	CVV_INVALID: "El CVV es ivalido",
};

function Carrito(props) {
	//coste del pedido
	const [coste, setCoste] = useState(0);
	//mostrar ventana modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	//variables de la ventana modal
	const [direccion, setDireccion] = useState("");
	const [nombre, setNombre] = useState("");
	const [tarjeta, setTarjeta] = useState("");
	const [fecha, setFecha] = useState("");
	const [cvv, setCvv] = useState("");
	const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();


	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			const today = new Date();

			//ERRORES DE VALIDACION
			const erroresValidacion = [];

			//ERROR SI LA DIRECCION NO ESTA INDICADA
			if (direccion === "") {
				erroresValidacion.push(Errores.DIRECCION_NULL);
			}

			//ERROR SI EL NOMBRE NO ESTA INDICADO
			if (nombre.length === 0) {
				erroresValidacion.push(Errores.NOMBRE_NULL);
			}

			//ERROR SI LA TARJETA NO ESTA BIEN ESCRITA (4 DIGITOS, ESPACIO, 4 DIGITOS...)
			if (!tarjeta.replace(/\s/g, "").match(/(\d\d\d\d){4}/g)) {
				erroresValidacion.push(Errores.TARJETA_INVALID);
			}

			//ERROR SI LA FECHA DE CADUCIDAD DE LA TARJETA NO ES CORRECTA
			const [month, year] = fecha.split("/");
			const mes = today.getMonth() + 1;
			const anyo = parseInt(today.getFullYear().toString().slice(-2));

			if (
				parseInt(year) <= anyo ||
				(parseInt(month) <= mes && parseInt(year) <= anyo) ||
				month > 12 ||
				month < 1
			) {
				erroresValidacion.push(Errores.DATE_INVALID);
			}

			if (!cvv.match(/\d\d\d/g)) {
				erroresValidacion.push(Errores.CVV_INVALID);
			}

			setErrors(erroresValidacion);

			if (erroresValidacion.length === 0) {
				const pedido = {
					id_User: props.log.login.id,
					list: props.log.login.pedido.map((producto) => ({
						id_Producto: producto.id,
						cantidad: producto.cantidad,
            precio: producto.precio
					})),
				};
				// comprar(props.log.login.pedido.map(producto => ({id: producto.id, cantidad: producto.cantidad})))
				const response = await fetch(process.env.REACT_APP_API_URL+"/pedidos", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(pedido),
				});
				setIsLoading(true)
        if(response.ok){
          history.push("/pedido-confirmado")                  
        }
			}
		},
		[
			direccion,
			nombre,
			tarjeta,
			fecha,
			cvv,
			props.log.login.pedido,
			props.log.login.id,
      history
		]
	);

	//multiplicar x producto por y cantidad, sumar y asignar el valor a coste
	useEffect(() => {
		const sums = props.log.login.pedido.map((el) => {
			return parseFloat(el.precio) * parseInt(el.cantidad);
		});
		if (props.log.login.pedido.length > 0) {
			const total = sums.reduce((prev, curr) => {
				return (prev = prev + curr);
			});
			setCoste(total.toFixed(2));
		} else {
			setCoste(0.0);
		}
	}, [props.log.login.pedido]);

	function cc_format(value) {
		const v = value
			.replace(/\s+/g, "")
			.replace(/[^0-9]/gi, "")
			.substr(0, 16);
		const parts = [];

		for (let i = 0; i < v.length; i += 4) {
			parts.push(v.substr(i, 4));
		}

		return parts.length > 1 ? parts.join(" ") : value;
	}

	function date_format(value) {
		const v = value
			.replace(/\s+/g, "")
			.replace(/[^0-9]/gi, "")
			.substr(0, 4);
		const parts = [];

		for (let i = 0; i < v.length; i += 2) {
			parts.push(v.substr(i, 2));
		}

		return parts.length > 1 ? parts.join("/") : value;
	}

	return (
		<div className="carrito">
			<div className="row m-0">
				<div className="col-7 m-2 p-3">
					<div className="bg-light">
						<h3 className="text-warning">
							Envios gratis con motivo de nuestra apertura
						</h3>
						<h6 className="text-secondary">
							No realizamos envios fuera de la peninsula*
						</h6>
					</div>
					<div>
						{/* mapear el array del pedido en cartas */}
						{props.log.login.pedido.map((producto) => (
							<div className="col mb-1" key={producto.id}>
								<div className="card">
									<div className="col-4 col-md-12 w-100">
										<img
											src={`${process.env.REACT_APP_API_URL}/api/file?imageUrl=${producto.fileName}`}
											className="card-img-top"
											alt="imagen del producto"
										></img>
									</div>
									<div className="col-8 col-md-12">
										<div className="card-body">
											<h4 className="card-title">
												{producto.marca}
											</h4>
											<p className="card-text">
												{producto.marca}{" "}
												{producto.modelo}
											</p>
											<p className="card-text">
												{producto.descripcion}
											</p>
											<p className="card-text">
												Ud: {producto.cantidad}
											</p>
											<p className="card-text">
												{producto.precio} €
											</p>
											<button
												className="btn btn-danger btn-sm"
												onClick={() =>
													props.quitar(producto.id)
												}
											>
												Eliminar
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-4 text-white bg-dark m-2 p-3">
					<h3>Resumen</h3>
					<p className="total mb-0">Total</p>
					<p className="total_precio mt-0">{coste}€</p>
					<p>Llegada estimada 2-3 dias laborables</p>
					{props.log.login.pedido.length > 0 ? (
						<div>
							{props.log.login.isLoggedIn ? (
								<button
									className="btn btn-warning mt-4 nextButton"
									onClick={handleShow}
								>
									Finalizar compra
								</button>
							) : (
								<Link to={"/login"}>
									<button className="btn btn-warning mt-4">
										Finalizar compra
									</button>
								</Link>
							)}
						</div>
					) : (
						<button
							onClick={() =>
								alert("No hay elementos en el carrito")
							}
							className="btn btn-warning mt-4 nextButton"
						>
							Finalizar compra
						</button>
					)}
				</div>
				<Modal
					show={show}
					onHide={handleClose}
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>
					<Modal.Body className="position-relative">
						<div className="row">
							<div className="col-12">
								<label>Direccion</label> <br></br>
								<input
                  disabled={isLoading}
									className="col-12"
									type="text"
									placeholder="C/Ejemplo, Portal, Piso, Letra"
									required
									value={direccion}
									onChange={(evt) =>
										setDireccion(evt.target.value)
									}
								></input>
							</div>
						</div>
						{/* <!-- INICIO TARJETA DE CREDITO --> */}
						<div className="panel panel-default credit-card-box">
							<div className="panel-body">
								<form id="payment-form">
									<div className="row">
										<div className="col-xs-12">
											<div className="form-group">
												<label htmlFor="cardOwner">
													NOMBRE DEL PROPIETARIO
												</label>
												<div className="input-group">
													<input
                            disabled={isLoading}
														type="text"
														className="form-control"
														name="cardOwner"
														placeholder="Nombre Apellidos"
														required
														autoFocus
														invalid
														value={nombre}
														onChange={(evt) =>
															setNombre(
																evt.target.value
															)
														}
													/>

													<span className="input-group-addon">
														<i className="fa fa-user"></i>
													</span>
												</div>
											</div>

											<div className="form-group">
												<label htmlFor="cardNumber">
													NUMERO DE TARJETA
												</label>
												<div className="input-group">
													<input
                            disabled={isLoading}
														type="text"
														className="form-control"
														name="cardNumber"
														placeholder="Tarjeta de credito valida"
														autoComplete="cc-number"
														required
														maxLength={19}
														value={cc_format(
															tarjeta
														)}
														onChange={(evt) => {
															let lastKey =
																evt.currentTarget.value.charAt(
																	tarjeta.length
																);
															if (
																!lastKey.match(
																	/([A-z])/g
																)
															) {
																setTarjeta(
																	cc_format(
																		evt
																			.currentTarget
																			.value
																	)
																);
															}
														}}
													/>
													<span className="input-group-addon">
														<i className="fa fa-credit-card"></i>
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-7">
											<div className="form-group">
												<label htmlFor="cardExpiry">
													<span>
														FECHA EXPIRACION
													</span>
												</label>
												<input
                          disabled={isLoading}
													type="text"
													className="form-control"
													name="cardExpiry"
													placeholder="MM / YY"
													autoComplete="cc-exp"
													required
													value={date_format(fecha)}
													onChange={(evt) => {
														let lastKey =
															evt.currentTarget.value.charAt(
																fecha.length
															);
														if (
															!lastKey.match(
																/([A-z])/g
															)
														) {
															setFecha(
																date_format(
																	evt
																		.currentTarget
																		.value
																)
															);
														}
													}}
												/>
											</div>
										</div>
										<div className="col-5 pull-right">
											<div className="form-group">
												<label htmlFor="cardCVC">
													CVV
												</label>
												<input
                          disabled={isLoading}
													type="password"
													className="form-control"
													name="cardCVC"
													placeholder="CVV"
													autoComplete="cc-csc"
													maxLength={3}
													required
													value={cvv}
													onChange={(evt) => {
														setCvv(
															evt.currentTarget
																.value
														);
													}}
												/>
											</div>
										</div>
									</div>
                  <div className="panel-heading display-table">
								<div className="row display-tr">
									<h3 className="panel-title display-td">
										Metodo de Pago
									</h3>
									<div className="display-td">
										<img
											className="img-responsive pull-right"
											style={{ width: "10%" }}
											alt="imagen de las tarjetas aceptadas"
											src={tarjetas}
										/>
									</div>
								</div>
							</div>
									<div className="row">
										<div className="col-xs-12"></div>
									</div>
									<div className="text-danger text-center p-3">
										{errors.length > 0 &&
											errors.map((error, i) => (
												<p key={i}>{error}</p>
											))}
									</div>
									<div className="row"></div>
									<div className="row">
										<div className="col-xs-12">
											<button
												className="btn btn-success btn-lg btn-block mt-2"
												type="submit"
												onClick={onSubmit}
                        disabled={isLoading}
											>
												Finalizar compra
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						{/* <!-- FINAL TARJETA DE CREDITO --> */}
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
