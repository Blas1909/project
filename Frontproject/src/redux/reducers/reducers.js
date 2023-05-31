import { combineReducers } from "redux";
import {
  LOADER,
  LOGIN, //eslint-disable-line
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_ADD,
  USER_ADD_FAIL,
  USER_ADD_SUCCESS,
  EDITAR,
  EDITAR_FAIL,
  UNLOCK_LOADER,
  DETALLE,
  PRODUCTOS,
  LIMPIO,
  PEDIDO,
  CONTACTOS,
  CARRITO_ELIMINAR_PRODUCTO,
  PEDIDOS,
} from "../actions/actions.js";

const initialState = {
  email: "",
  id: 0,
  name: "",
  token: "",
  // password: "",
  isAdmin: false,
  isLoggedIn: false,
  //boolean para mensajes de error al login y register
  error: false,
  //boolean para bloquear los botones de login y de mas para evitar el click spam y que hayan errores
  enable: false,
  //boolean para redirigir al crear una cuenta al login (era una mala idea asi que creo que lo  quite porque no te dejaba volver a acceder al registro)
  registrado: false,
  //boolean para saber si las contraseñas coinciden
  coinciden: false,
  //productos son todos los de la tienda
  productos: [],
  //producto individual/detalle
  productodetalle: [],
  //id del producto para buscar en la pestaña detalle
  buscar: 0,
  //añadir array de pedido para guardar los elementos que se compraran?
  pedido: [],
  //cantidad del producto detalle para renderizar el select y las options
  stock: [],
  //variable para saber cuanta cantidad se compra de x producto
  cantidad: 0,
  //array que contiene las consultas
  contactos: [],
  //array que contien los pedidos
  pedidos: []
};

export function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.users,
        isLoggedIn: true,
        error: false,
        isAdmin: action.users.admin,
      };
    case LOGIN_FAIL:
      return {
        initialState,
        error: true,
        enable: false,
      };
    case USER_ADD:
      return {
        //cambiar por intento de registro
        ...state,
        ...action.users,
      };
    case USER_ADD_SUCCESS:
      return {
        ...state,
        ...action.users,
        error: false,
        registrado: true,
      };
    case USER_ADD_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: true,
        registrado: false,
      };
    case LOGOUT:
      return initialState;
    case LOADER:
      return {
        ...state,
        enable: true,
      };
    case UNLOCK_LOADER:
      return {
        ...state,
        enable: false,
      };
    case EDITAR:
      return {
        ...state,
        ...action.users,
      };
    case EDITAR_FAIL:
      return {
        ...state,
      };
    case DETALLE:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id === action.payload.id
        ),
      };
    case PRODUCTOS:
      return {
        ...state,
        productos: action.productos,
      };
    case CONTACTOS:
      return {
        ...state,
        contactos: action.contactos,
      };
      case PEDIDOS:
        return {
          ...state,
          pedidos: action.pedidos,
        };
    case PEDIDO:
      let productToUpdate = state.productos.find(
        (item) => item.id === action.payload.id
      );
      productToUpdate = {
        ...productToUpdate,
        cantidad: action.payload.cantidad,
      };
      return {
        ...state,
        pedido: [...state.pedido, productToUpdate],
      };
    case LIMPIO:
      return {
        ...state,
        error: false,
      };
    case CARRITO_ELIMINAR_PRODUCTO:
      return {
        ...state,
        pedido: [...state.pedido.filter(prod_carrito => prod_carrito.id !== action.payload.id)],
      };
    default:
      return state;
  }
}



export const reducer = combineReducers({
  login,
});
