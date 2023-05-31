import store from "../store/store";
import {
  login_fail_action,
  login_success_action,
  logout_action,
  add_user_fail,
  loader,
  add_user_success,
  editar,
  edit_fail,
  unlock_loader,
  todos_productos,
  todos_contactos,
  todos_pedidos
} from "../actions/actions.js";

export function login(dispatch) {
  return async function (email, password) {
    //bloquear boton
    dispatch(loader());
    let user = { email, password };
    //si da error es que ese usuario no existe. Solo hay uno, que es test
    let result = await fetch(process.env.REACT_APP_API_URL+"/users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    result = await result.json();
    if (result.id > 0) {
      //si el usuario devuelto tiene una id despacha el login success
      dispatch(login_success_action(result));
      window.localStorage.setItem("user-info", JSON.stringify(result));
      // si da falso es un usuario, si da true es un admin
    } else {
      //si el usuario no tiene id despacha el login fail
      dispatch(login_fail_action(result));
      dispatch(unlock_loader());
    }
    dispatch(unlock_loader());
  };
}


export function registro(dispatch) {
  return async function (name, email, password) {
    let user = { name, email, password };
    let result = await fetch(process.env.REACT_APP_API_URL+"/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //si el fetch devuelve un 200 despacha el registro correcto
    if (result.status > 199 && result.status < 300) {
      result = await result.json();
      dispatch(add_user_success());
    } else {
      //si no es un 200 no se registra el usuario
      //esta validacion es porque si se mete un correo que ya esta registrado en lugar de registrarlo de nuevo hacia el login
      //pero no es plan que poneiendo el correo de otra persona y otros datos cualquiera entre
      dispatch(add_user_fail());
    }
    dispatch(unlock_loader());
  };
}



export function mal_registro() {
  store.dispatch(add_user_fail());
}

//despach logout
export function salir() {
  store.dispatch(logout_action());
}

//mapStateToProps no se debe usar en funcines async como peticiones AJAX y las funciones no deben ser async
//ademas mapStateToProps debe ser una funcion pura, como en redux un reducer

export function edit(dispatch) {
  return async function (id, name, email) {
    dispatch(loader());
    let user = { id, name, email };
    let result = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (result.status > 199 && result.status < 300) {
      dispatch(editar());
    } else {
      dispatch(edit_fail());
    }
  };
}



export function getProducto(dispatch) {
  fetch(process.env.REACT_APP_API_URL+"/producto").then((result) => {
    result.json().then((resp) => {
      dispatch(todos_productos(resp));
    });
  });
}



export function getContactos(dispatch) {
  fetch(process.env.REACT_APP_API_URL+"/contacto").then((result) => {
    result.json().then((resp) => {
      dispatch(todos_contactos(resp));
    });
  });
}


export function getPedidos(dispatch) {
  fetch(process.env.REACT_APP_API_URL+"/pedidos").then((result) => {
    result.json().then((resp) => {
      dispatch(todos_pedidos(resp));
    });
  });
}

export function getPedidosUsuario(dispatch){
  return async function (id) {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/pedidos?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result.json().then((resp)=>{
      dispatch(todos_pedidos(resp))
    })
  }
}
