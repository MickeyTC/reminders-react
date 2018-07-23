import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO_COMPLETED
} from "../constants/actionTypes";
import initialState from "./initialState";

const todos = (state = initialState.todoList, action) => {
  const newTodoList = state.map(todo => ({ ...todo }));
  switch (action.type) {
    case ADD_TODO:
      newTodoList.push(action.todo);
      return newTodoList;
    case UPDATE_TODO:
      const idxTodo = newTodoList.findIndex(todo => todo.id === action.todo.id);
      if (idxTodo === -1) return state;
      newTodoList.splice(idxTodo, 1, action.todo);
      return newTodoList;
    case DELETE_TODO:
      const deletedTodoList = newTodoList.filter(todo => todo.id !== action.id);
      return deletedTodoList;
    case TOGGLE_TODO_COMPLETED:
      const foundTodo = newTodoList.find(todo => todo.id === action.id);
      if (foundTodo === undefined) return state;
      foundTodo.completed = !foundTodo.completed;
      return newTodoList;
    default:
      return state;
  }
};

export default todos;
