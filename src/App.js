import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

import uniqid from 'uniqid';

class App extends Component {
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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
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

  deleteTodo(id) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList
        .map(todo => ({ ...todo }))
        .filter(todo => todo.id !== id);
      return { todoList: newTodoList };
    });
  }

  addTodo(title) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList.map(todo => ({ ...todo }));
      newTodoList.push({
        id: uniqid(),
        title: title,
        description: "",
        date: null,
        completed: false
      });
      return { todoList: newTodoList };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TodoAdd
          addTodo={this.addTodo}
        />
        <TodoList
          todoList={this.state.todoList}
          toggleTodoCompleted={this.toggleTodoCompleted}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;
