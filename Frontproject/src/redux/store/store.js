import { createStore } from "redux";
import { reducer } from "../reducers/reducers";

//distintas maneras de crear el store, la segunda con combine reducers
// let store = createStore(login);
let store = createStore(reducer);

export default store;
