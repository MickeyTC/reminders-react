import React from "react";
import { List, Input } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, toggleTodoCompleted, deleteTodo }) => {
  return (
    <div>
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
        <Input />
      </List>
    </div>
  );
};

export default TodoList;
