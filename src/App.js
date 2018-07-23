import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompleted
} from "./actions/todoList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandCompleted: true
    };
    this.handleCompletedClick = this.handleCompletedClick.bind(this);
  }

  handleCompletedClick() {
    this.setState(prevState => ({
      expandCompleted: !prevState.expandCompleted
    }));
  }

  render() {
    const {
      todoList,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodoCompleted
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Reminders React</h1>
        </header>
        <TodoList
          todoList={todoList}
          expandCompleted={this.state.expandCompleted}
          onCompletedClick={this.handleCompletedClick}
          onToggleCompleted={toggleTodoCompleted}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
        <div className="add-button">
          <TodoAdd onAddTodo={addTodo} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    updateTodo: todo => dispatch(updateTodo(todo)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    toggleTodoCompleted: id => dispatch(toggleTodoCompleted(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
