import React from "react";
import { List } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, toggleTodoCompleted, deleteTodo }) => {
  return (
    <List>
      {todoList.map(todo => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={toggleTodoCompleted}
            onDeleteTodo={deleteTodo}
          />
        );
      })}
    </List>
  );
};

export default TodoList;
