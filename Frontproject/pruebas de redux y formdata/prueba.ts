// LA STORE ES EL OBJETO EN EL QUE SE ALMACENA EL ESTADO GLOBAL DE LA APLICACION
import { useState } from "react";
import { createStore } from "redux";
let store = createStore(/*aqui va el componenete creado con combine reducer*/);
//La store contiene el estado de la aplicacion
//permite el acceso al estado via getState()
//permite que se actualice el estado via dispatch(action)
//registra los listeners via subscribe(listener)
//maneja la anuliacion del registro de los listener via el retorno de la funcion de subscribe(listener)

//AHORA QUE CAMBIO A TYPESCRIPT LAS VARIABLES SE DEBEN DECLARAR
let text = "";

//declarar initialState con los parametros que sabemos que queremos tener en nuestro estado
const initialState = {
  username: "",
  email: "",
  isLoggedIn: false,
};

//prueba reducer
function pruebadeestado(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }
  return state;
}
    // |
    // |
    // |
    // |
    // V
//son la misma funcion
function pruebadeestado2(state = initialState, action) {
  return state;
}
//algunas veces se pueden actualizar campos del estado de manera independiente

//ejemplo de dispatch de una action
store.dispatch(nuevanota("hola"));

//Las acciones se pueden guardar todas en un mismo archivo e importarlas
//declarar un tipo (type) (descripcion de lo que se quiere hacer)
const ADD_TODO = "ADD_TODO";
const INTENTO_LOGIN = "INTENTO_LOGIN";
const LOGIN_EXITO = "LOGIN_EXITO";
const LOGIN_FAIL = "LOGIN_FAIL";

//CREADOR DE ACCIONES
//declarar una action (objeto plano de javascript)
function nuevanota(text) {
  return {
    type: ADD_TODO,
    payload: {
      text,
    },
  };
}
    // |
    // |
    // |
    // |
    // V
//son la misma funcion
//el payload no es necesario declararlo explicitamente
function nuevanota2(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

//CREADOR DE ACCIONES QUE SE DESPACHA AUTOMATICAMENTE
const boundAddTodo = (text) => store.dispatch(nuevanota(text));
boundAddTodo(text);

/*
ANOTACION SOBRE LAS ACCIONES:
LAS ACCIONES PUEDEN SER COMPLICADAS DEBIDO A PETICIONES ASYNCRONAS
POR ESO ES IMPORTANTE DEFINIR TIPOS DE ACCIONES SEPARADAS COMO: LOGIN_EXITO O LOGIN_FAIL

//PREGUNTAR A JUANPE
NOTA: SEGUN LA DOCUMENTACION DE FLUX SOBRECARGAR DE ACCIONES NO ES IDEAL, ES MEJOR AÑADIR LOS ERRORES EN EL PAYLOAD

ACCIONES: DEBEN SER UN OBJETO PLANO DE JAVASCRIPT Y TENER UN TYPE OBLIGATORIAMENTE
OPCIONALMENTE PUEDEN TENER UNA PROPIEDAD ERROR, PAYLOAD O META. NO PUEDE TENER OTRO TIPO DE PROPIEDADES

EL TYPE ES LA DECLARACION DE LA ACCION QUE QUEREMOS LLEVAR A CABO (LOGIN, AÑADIR_NOTA, ETC)
PAYLOAD PUEDE SER CUALQUIER TIPO DE VALOR, REPRESENTA EL PAYLOAD DE LA ACCION. CUALQUIER INFORMACION QUE NO SEA TYPE O STATUS DEBE IR EN EL PAYLOAD
SI HAY UN ERROR TRUE, EL PAYLOAD DEBERIA SER UN OBJETO ERROR

LA PROPIEDAD ERROR SE CONVIERTE EN TRUE SI LA ACCION REPRESENTA UN ERROR Y EL PAYLOAD DEBE DEVOLVER UN OBJETO ERROR
SI LA PROPIEDAD ERROR TIENE OTRO VALOR QUE NO SEA TRUE (INCLUYENDO UNDEFINED Y NULL) LA ACCION NO PUEDE SER INTERPRETADA COMO UN ERROR

LA PROPIEDAD META PUEDE SER CUALQUIER TIPO DE VALOR Y AÑADE INFORMACION EXTRA QUE NO FORMA PARTE DEL PAYLOAD
*/

//valores que seran pasados desde el form
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
};
