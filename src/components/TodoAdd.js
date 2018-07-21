import React, { Component, Fragment } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import TodoDetail from "./TodoDetail";
import uniqid from "uniqid";

class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddTodo: false,
      todoID: uniqid()
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClickAdd() {
    this.setState({ openAddTodo: true });
  }

  handleCancel() {
    console.log("cancel", this.state.todoID);
    this.setState({ openAddTodo: false });
  }

  handleSave(todo) {
    console.log("save", this.state.todoID, todo);
    this.setState({ openAddTodo: false, todoID: uniqid() });
    this.props.onAddTodo(todo);
  }

  render() {
    const todo = {
      id: this.state.todoID,
      title: "",
      description: "",
      date: "",
      completed: false
    };
    return (
      <Fragment>
        <Button
          onClick={this.handleClickAdd}
          type="submit"
          variant="extendedFab"
          color="primary"
        >
          <AddIcon />
          Add
        </Button>
        <TodoDetail
          todo={todo}
          open={this.state.openAddTodo}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
        />
      </Fragment>
    );
  }
}

TodoAdd.propTypes = {
  onAddTodo: PropTypes.func
};

export default TodoAdd;
