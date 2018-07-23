import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO_COMPLETED
} from "../constants/actionTypes";

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    todo
  };
};

export const updateTodo = todo => {
  return {
    type: UPDATE_TODO,
    todo
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

export const toggleTodoCompleted = id => {
  return {
    type: TOGGLE_TODO_COMPLETED,
    id
  };
};
