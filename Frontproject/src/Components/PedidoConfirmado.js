import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function PedidoConfirmado(props) {
    const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
            history.push("/pedidos")
		}, 10000);
	}, [history]);

	return (
		<div className="bg-success text-white text-center">
			<div className="row">
				<div className="col p-5">
					<h1>Gracias por tu pedido</h1>
					<p>
						Tu pedido se está procesando. Serás redirigido a una
						página con tus pedidos en pocos segundos
					</p>
						<Link to="/pedidos" className="btn-dark rounded p-2">
							Si no te redirige, haz click aquí
						</Link>
				</div>
			</div>
		</div>
	);
}
export default PedidoConfirmado;
