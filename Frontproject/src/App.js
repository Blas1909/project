import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import ProductoDetail from "./Components/ProductoDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Tienda from "./Components/Tienda";
import Inicio from "./Components/Inicio";
import Carrito from "./Components/Carrito";
import "./App.css";
import Contacto from "./Components/Contacto";
import Consultas from "./Components/Consultas";
import PedidoConfirmado from "./Components/PedidoConfirmado";
import Pedidos from "./Components/Pedidos";
import { useState } from "react";
import { useIsLoggedIn } from "./hooks/hooks";

function App() {
  // const ruta = "/BenidormFitness";
  const [recoverSession, setRecoverSession] = useState(true)
  useIsLoggedIn(recoverSession)
  useState(()=>{
    if(recoverSession){
      setRecoverSession(false)
    }
  }, recoverSession)
  return (
    <div>
      <Navbar />
      <Switch>
        {/* si la ruta no es exact te lleva a la primera que encuentre /, usar exact si no se va a concatenar nada a la url */}
        <Route exact path="/" component={Inicio} />
        <Route exact path="/inicio" component={Inicio} />
        <Route exact path="/registro" component={Register} />
        <Route exact path="/tienda" component={Tienda} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/productodetail" component={ProductoDetail} />
        <Route exact path="/contacto" component={Contacto} />
        <Route exact path="/consultas" component={Consultas} />
        <Route exact path="/pedidos" component={Pedidos} />
        <Route exact path="/pedido-confirmado" component={PedidoConfirmado} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
