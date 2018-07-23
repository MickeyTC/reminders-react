import { combineReducers } from "redux";
import todoList from "./todoList";
import expandCompleted from "./expandCompleted";

export default combineReducers({
  todoList,
  expandCompleted
});
