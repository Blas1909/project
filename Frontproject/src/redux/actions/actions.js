export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const USER_ADD = "USER ADD";
export const LOGIN_FAIL = "LOGIN FAIL";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const USER_ADD_FAIL = "USER_ADD_FAIL";
export const USER_ADD_SUCCESS = "USER_ADD_SUCCESS";
export const LOADER = "LOADER";
export const EDITAR = "EDITAR";
export const EDITAR_FAIL = "EDITAR_FAIL";
export const UNLOCK_LOADER = "UNLOCK_LOADER";
export const DETALLE = "DETALLE";
export const PRODUCTOS = "PRODUCTOS";
export const LIMPIO = "LIMPIO";
export const PEDIDO = "PEDIDO";
export const CONTACTOS = "CONTACTOS";
export const CARRITO_ELIMINAR_PRODUCTO = "CARRITO_ELIMINAR_PRODUCTO";
export const PEDIDOS = "PEDIDOS";

//ACCIONES DE LOGIN
export function login_action(users) {
  return {
    type: LOGIN,
    users,
  };
}

export function login_fail_action(users) {
  return {
    type: LOGIN_FAIL,
    users: null,
  };
}

export function login_success_action(users) {
  return {
    type: LOGIN_SUCCESS,
    users,
  };
}
//FIN DE ACCIONES DE LOGIN

//ACCIONES DE LOGOUT
export function logout_action(users) {
  return {
    type: LOGOUT,
    users,
  };
}
//FIN DE ACCIONES DE LOGOUT

//ACCIONES DE USUARIO
export function add_user_action(users) {
  return {
    type: USER_ADD,
    users,
  };
}

export function add_user_fail(users) {
  return {
    type: USER_ADD_FAIL,
    users,
  };
}

export function add_user_success(users) {
  return {
    type: USER_ADD_SUCCESS,
    users,
  };
}
//FIN DE ACCIONES DE USUARIO

//ACCIONES LOADER
export function loader() {
  return {
    type: LOADER,
  };
}
export function unlock_loader() {
  return {
    type: UNLOCK_LOADER,
  };
}
//FIN ACCIONES LOADER

//INICIO ACCIONES EDITAR
export function editar() {
  return {
    type: EDITAR,
  };
}

export function edit_fail() {
  return {
    type: EDITAR_FAIL,
  };
}
//FIN ACCIONES EDITAR

//INICIO ACCIONES DETALLE
export function detalle_producto(id) {
  return {
    type: DETALLE,
    payload: {
      id,
    },
  };
}
//FIN ACCIONES DETALLE

//INICIO ACCION QUITAR DEL CARRITO
export function quitar_producto_carrito(id) {
  return{
    type: CARRITO_ELIMINAR_PRODUCTO,
    payload: {
      id,
    },
  };
}
//FIN ACCION QUITAR DEL CARRITO

//INICO ACCIONES PRODUCTOS
export function todos_productos(productos) {
  return {
    type: PRODUCTOS,
    productos,
  };
}
//FIN ACCIONES PRODUCTOS

//INICO ACCIONES CONTACTOS
export function todos_contactos(contactos) {
  return {
    type: CONTACTOS,
    contactos,
  };
}
//FIN ACCIONES CONTACTOS

//INICIO ACCIONES CARGAR PEDIDOS
export function todos_pedidos(pedidos) {
  return {
    type: PEDIDOS,
    pedidos,
  };
}

//FIN ACCIONES CARGAR PEDIDOS

//INICO ACCIONES PEDIDO
export function cargar_pedido(id, cantidad) {
  return {
    type: PEDIDO,
    payload: {
      cantidad,
      id,
    },
  };
}
//FIN ACCIONES PEDIDO

//INICIO ACCION LIMPIAR ERRORES AL NAVEGAR
export function limpiar() {
  return {
    type: LIMPIO,
  };
}
//FIN ACCION LIMPIAR ERRORES AL NAVEGAR

