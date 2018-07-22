import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  withStyles
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import PropTypes from "prop-types";
import moment from "moment";

const styles = theme => ({
  dialogAction: {
    justifyContent: "center"
  },
  dueContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  dateInput: {
    flexGrow: 2
  },
  timeInput: {
    flexGrow: 1
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class TodoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      shortDate: "",
      shortTime: ""
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const todo = newProps.todo;
    this.setState({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      shortDate:
        newProps.todo.date === ""
          ? ""
          : moment(newProps.todo.date, "YYYY-MM-DD HH:mm Z").format(
              "YYYY-MM-DD"
            ),
      shortTime:
        newProps.todo.date === ""
          ? ""
          : moment(newProps.todo.date, "YYYY-MM-DD HH:mm Z").format("HH:mm")
    });
  }

  handleChangeText(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;
    // console.log(name, value);
    this.setState(prevState => {
      if (name === "shortDate" && prevState.shortTime === "" && value !== "") {
        return {
          ...prevState,
          shortDate: value,
          shortTime: "00:00"
        };
      }
      if (name === "shortTime" && prevState.shortDate === "" && value !== "") {
        return {
          ...prevState,
          shortDate: moment().format("YYYY-MM-DD"),
          shortTime: value
        };
      }
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  handleSubmit(event) {
    const newTodo = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      completed: this.props.todo.completed
    };
    let newMoment = null;
    if (this.state.shortDate !== "" && this.state.shortTime === "") {
      newMoment = moment(this.state.shortDate, "YYYY-MM-DD");
    } else if (this.state.shortDate === "" && this.state.shortTime !== "") {
      newMoment = moment(this.state.shortTime, "HH:mm");
    } else if (this.state.shortDate !== "" && this.state.shortTime !== "") {
      newMoment = moment(`${this.state.shortDate} ${this.state.shortTime}`, "YYYY-MM-DD HH:mm");
    }
    newTodo.date = newMoment !== null ? newMoment.format("YYYY-MM-DD HH:mm Z") : "";
    this.props.onSave(newTodo);
    event.preventDefault();
  }

  render() {
    const { classes, open, dialogTitle, onCancel } = this.props;
    return (
      <Dialog open={open} onClose={() => onCancel()}>
        <form onSubmit={this.handleSubmit}>
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          <DialogContent>
            <TextField
              name="id"
              label="ID"
              margin="dense"
              disabled
              fullWidth
              value={this.state.id}
              onChange={this.handleChangeText}
            />
            <TextField
              name="title"
              label="Title"
              margin="dense"
              fullWidth
              value={this.state.title}
              onChange={this.handleChangeText}
              autoFocus
            />
            <TextField
              name="description"
              label="Description"
              margin="dense"
              fullWidth
              multiline
              rows="3"
              value={this.state.description}
              onChange={this.handleChangeText}
            />
            <div className={classes.dueContainer}>
              <TextField
                name="shortDate"
                type="date"
                label="Due Date"
                className={classes.dateInput}
                margin="dense"
                value={this.state.shortDate}
                onChange={this.handleChangeText}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                name="shortTime"
                type="time"
                label="Time"
                className={classes.timeInput}
                margin="dense"
                value={this.state.shortTime}
                onChange={this.handleChangeText}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Save
              <SaveIcon className={classes.rightIcon} />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

TodoDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool
  }),
  open: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

export default withStyles(styles)(TodoDetail);
