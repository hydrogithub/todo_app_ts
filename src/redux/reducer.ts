import { combineReducers } from "redux";
import { filtersReducer } from "./FiltersSlice";
import { todoReducer } from "./TodoSlice";

const rootReducer = combineReducers({
    filters: filtersReducer.reducer,
    todoList: todoReducer.reducer,
});

export default rootReducer;
