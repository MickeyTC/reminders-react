import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

const TodoListItem = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <ListItem button divider>
      <Checkbox
        checked={todo.completed}
        disableRipple
        onChange={() => onToggleCompleted(todo.id)}
      />
      <ListItemText
        primary={todo.title}
        secondary={todo.date && moment(todo.date).fromNow()}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onDeleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
