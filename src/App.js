import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      expandCompleted: true
    };
    this.readLocalStorage = this.readLocalStorage.bind(this);
    this.writeLocalStorage = this.writeLocalStorage.bind(this);
    this.toggleTodoCompleted = this.toggleTodoCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.handleCompletedClick = this.handleCompletedClick.bind(this);
  }

  readLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        this.setState({ [key]: value });
      }
    }
  }

  writeLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentWillMount() {
    this.readLocalStorage();
    // window.addEventListener("beforeunload", this.writeLocalStorage);
  }

  componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.writeLocalStorage);
    this.writeLocalStorage();
  }

  toggleTodoCompleted(id) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList.map(todo => ({ ...todo }));
      const foundTodo = newTodoList.find(todo => todo.id === id);
      if (foundTodo === undefined) return;
      foundTodo.completed = !foundTodo.completed;
      return { todoList: newTodoList };
    }, this.writeLocalStorage);
  }

  deleteTodo(id) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList
        .map(todo => ({ ...todo }))
        .filter(todo => todo.id !== id);
      return { todoList: newTodoList };
    }, this.writeLocalStorage);
  }

  addTodo(newTodo) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList.map(todo => ({ ...todo }));
      newTodoList.push(newTodo);
      return { todoList: newTodoList };
    }, this.writeLocalStorage);
  }

  updateTodo(newTodo) {
    this.setState(prevState => {
      const newTodoList = prevState.todoList.map(todo => ({ ...todo }));
      const idxfoundTodo = newTodoList.findIndex(
        todo => todo.id === newTodo.id
      );
      if (idxfoundTodo === -1) return;
      newTodoList.splice(idxfoundTodo, 1, newTodo);
      return { todoList: newTodoList };
    }, this.writeLocalStorage);
  }

  handleCompletedClick() {
    this.setState(
      prevState => ({ expandCompleted: !prevState.expandCompleted }),
      this.writeLocalStorage
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Reminders React</h1>
        </header>
        <TodoList
          todoList={this.state.todoList}
          expandCompleted={this.state.expandCompleted}
          onCompletedClick={this.handleCompletedClick}
          onToggleCompleted={this.toggleTodoCompleted}
          onDeleteTodo={this.deleteTodo}
          onUpdateTodo={this.updateTodo}
        />
        <TodoAdd onAddTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
