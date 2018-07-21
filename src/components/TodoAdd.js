import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import uniqid from "uniqid";

class TodoAdd extends Component {
  constructor(props) {
    // const { onAddTodo } = props;
    super(props);
    this.state = {
      todoTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todoTitle: event.target.value });
  }

  handleSubmit(event) {
    const title = this.state.todoTitle;
    if (title !== "") {
      this.props.onAddTodo({
        id: uniqid(),
        title: title,
        description: "",
        date: "",
        completed: false
      });
      this.setState({ todoTitle: "" });
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input value={this.state.todoTitle} onChange={this.handleChange} />
        <Button type="submit" variant="extendedFab" color="primary">
          <AddIcon />
          Add
        </Button>
      </form>
    );
  }
}

export default TodoAdd;
