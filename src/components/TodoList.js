import React, { Component, Fragment } from "react";
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

const styles = {
  todoPaper: {
    margin: "2em"
  }
};
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
    const {
      classes,
      todoList,
      onToggleCompleted,
      onDeleteTodo,
      onUpdateTodo
    } = this.props;
    const nonCompletedTodoList = todoList.filter(todo => !todo.completed);
    const completedTodoList = todoList.filter(todo => todo.completed);
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
      <Fragment>
        <Paper className={classes.todoPaper}>
          <List disablePadding>
            <ListItem button onClick={this.handleCompletedClick}>
              <Avatar>{numCompleted.toString()}</Avatar>
              <ListItemText
                primary="Completed"
                primaryTypographyProps={{ variant: "headline" }}
              />
              {this.state.completedExpand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.completedExpand} timeout="auto">
              <List disablePadding>{listItem(completedTodoList)}</List>
            </Collapse>
          </List>
        </Paper>
        {nonCompletedTodoList.length > 0 && (
          <Paper className={classes.todoPaper}>
            <List disablePadding>{listItem(nonCompletedTodoList)}</List>
          </Paper>
        )}
      </Fragment>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      completed: PropTypes.bool
    })
  ).isRequired,
  onToggleCompleted: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};

export default withStyles(styles)(TodoList);
