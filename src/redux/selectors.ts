import { createSelector } from "@reduxjs/toolkit";
import { Todo, Filters } from "../interface";

type stateTodo = {
  todoList: Todo[];
};

export const searchTextSelector = (state: Filters) => state.filters.search;
export const statusSelector = (state: Filters) => state.filters.status;
export const todoListSelector = (state: stateTodo) => state.todoList;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  statusSelector,
  searchTextSelector,
  (todoList, status, searchText) =>
    todoList.filter((todo: Todo) => {
      if (status === "ALL") {
        return todo.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return (
        todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (status === "Completed" ? todo.completed : !todo.completed)
      );
    })
);
