import React from "react";
import { connect } from "react-redux";
import {
  List,
  Collapse,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  withStyles
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";
import {
  updateTodo,
  deleteTodo,
  toggleTodoCompleted
} from "../actions/todoList";
import { toggleExpandCompleted } from "../actions/expandCompleted";

const styles = {
  listContainer: {
    maxWidth: "800px",
    width: "100%"
  },
  todoPaper: {
    margin: "1.5em"
  },
  countAvatar: {
    backgroundColor: "#008000"
  }
};

const TodoList = ({
  classes,
  todoList,
  expandCompleted,
  onCompletedClick,
  onToggleCompleted,
  onDeleteTodo,
  onUpdateTodo
}) => {
  const nonCompletedTodoList = todoList
    ? todoList.filter(todo => !todo.completed)
    : [];
  const completedTodoList = todoList
    ? todoList.filter(todo => todo.completed)
    : [];
  const numCompleted = completedTodoList.length;
  const listItem = list => {
    return list.map(todo => {
      return (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      );
    });
  };
  return (
    <div className={classes.listContainer}>
      <Paper elevation={5} className={classes.todoPaper}>
        <List disablePadding>
          <ListItem button onClick={onCompletedClick}>
            <Avatar className={classes.countAvatar}>
              {numCompleted.toString()}
            </Avatar>
            <ListItemText
              primary="Completed"
              primaryTypographyProps={{ variant: "headline", noWrap: true }}
            />
            {expandCompleted ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandCompleted} timeout="auto">
            <List disablePadding>{listItem(completedTodoList)}</List>
          </Collapse>
        </List>
      </Paper>
      {nonCompletedTodoList.length > 0 && (
        <Paper elevation={5} className={classes.todoPaper}>
          <List disablePadding>{listItem(nonCompletedTodoList)}</List>
        </Paper>
      )}
    </div>
  );
};

TodoList.propTypes = {
  classes: PropTypes.object.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      completed: PropTypes.bool
    })
  ),
  expandCompleted: PropTypes.bool.isRequired,
  onCompletedClick: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};

const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    expandCompleted: state.expandCompleted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCompletedClick: () => dispatch(toggleExpandCompleted()),
    onToggleCompleted: id => dispatch(toggleTodoCompleted(id)),
    onDeleteTodo: id => dispatch(deleteTodo(id)),
    onUpdateTodo: todo => dispatch(updateTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TodoList));
