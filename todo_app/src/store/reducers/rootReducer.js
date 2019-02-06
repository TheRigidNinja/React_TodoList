import authReducer from "./authReducer"
import todosReducer from "./todosReducer";
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth:authReducer,
    Todos: todosReducer

});

export default rootReducer;