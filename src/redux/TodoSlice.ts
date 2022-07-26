import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../interface";

export const todoReducer = createSlice({
    name: "todoList",
    initialState: [],
    reducers: {
        addTodo: (state: Todo[], action: PayloadAction<Todo>) => {
            state.push(action.payload);
        },
        toggleTodoList: (state: Todo[], action: PayloadAction<string>) => {
            const currentTodo = state.find(todo => todo.id === action.payload);
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            } else {
                // console.log("Id không tồn tại");
            }
        },
    },
});
