import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

class TodoListItem extends Component {
  render() {
    return (
      <ListItem button divider>
        <Checkbox
          checked={this.props.todo.completed}
          disableRipple
          onChange={() => this.props.onToggleCompleted(this.props.todo.id)}
        />
        <ListItemText
          primary={this.props.todo.title}
          secondary={
            this.props.todo.date && moment(this.props.todo.date).fromNow()
          }
        />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default TodoListItem;
