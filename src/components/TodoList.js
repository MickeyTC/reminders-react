import React, { Component } from "react";
import {
  List,
  Collapse,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import TodoListItem from "./TodoListItem";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedExpand: false
    };
    this.handleCompletedClick = this.handleCompletedClick.bind(this);
  }

  handleCompletedClick() {
    this.setState(prevState => ({
      completedExpand: !prevState.completedExpand
    }));
  }

  render() {
    const { todoList, toggleTodoCompleted, deleteTodo } = this.props;
    const completedTodoList = todoList.filter(todo => todo.completed);
    const numCompleted = completedTodoList.length;
    return (
      <div>
        <List>
          <ListItem button onClick={this.handleCompletedClick}>
            <Avatar>{numCompleted}</Avatar>
            <ListItemText
              primary="Completed"
              primaryTypographyProps={{ variant: "headline" }}
            />
            {this.state.completedExpand ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.completedExpand} timeout="auto">
            <List disablePadding>
              {completedTodoList.map(todo => {
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
          </Collapse>
        </List>
        <Divider />
        <List>
          {todoList.filter(todo => !todo.completed).map(todo => {
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
      </div>
    );
  }
}

export default TodoList;
