import React, { Component } from "react";
import { List } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          id: "asd",
          title: "asdas",
          description: "asdww",
          date: new Date(2018, 11, 1),
          completed: false
        },
        {
          id: "asd2",
          title: "asdas2",
          description: "asdww2",
          date: null,
          completed: true
        }
      ]
    };
    this.toggleTodoCompleted = this.toggleTodoCompleted.bind(this);
  }

  toggleTodoCompleted(id) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList.map(todo => ({ ...todo }));
      const newTodo = newTodoList.find(todo => todo.id === id);
      if (newTodo === undefined) return;
      newTodo.completed = !newTodo.completed;
      return { todoList: newTodoList };
    });
  }

  render() {
    return (
      <List>
        {this.state.todoList.map(todo => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleCompleted={this.toggleTodoCompleted}
            />
          );
        })}
      </List>
    );
  }
}

export default TodoList;
