import React, { Component, Fragment } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import moment from "moment";
import TodoDetail from "./TodoDetail";

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetail: false
    };
    this.handleClickOpenDetail = this.handleClickOpenDetail.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClickOpenDetail() {
    this.setState({ openDetail: true });
  }

  handleCancel() {
    this.setState({ openDetail: false });
  }

  handleSave(todo) {
    this.props.onUpdateTodo(todo);
    this.setState({ openDetail: false });
  }

  render() {
    const { todo, onToggleCompleted, onDeleteTodo } = this.props;
    return (
      <Fragment>
        <ListItem button onClick={this.handleClickOpenDetail}>
          <Checkbox
            checked={todo.completed}
            disableRipple
            onChange={() => onToggleCompleted(todo.id)}
          />
          <ListItemText
            primary={todo.title}
            secondary={
              todo.date && moment(todo.date, "YYYY-MM-DD HH:mm Z").fromNow()
            }
          />
          <ListItemSecondaryAction>
            <IconButton color="secondary" onClick={() => onDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <TodoDetail
          todo={todo}
          open={this.state.openDetail}
          dialogTitle="Edit Reminder"
          onCancel={this.handleCancel}
          onSave={this.handleSave}
        />
      </Fragment>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool
  }),
  onToggleCompleted: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};

export default TodoListItem;
