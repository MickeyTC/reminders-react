import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import PropTypes from "prop-types";
import moment from "moment";

class TodoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ todo: newProps.todo });
  }

  handleChangeText(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;
    // console.log(name, value);
    this.setState(prevState => {
      return {
        todo: {
          ...prevState.todo,
          [name]: value
        }
      };
    });
  }

  handleChangeDate(event) {
    const target = event.target;
    const value = target.value;
    // console.log("Date", value, value.length);
    if (value === "") {
      this.setState(prevState => ({
        todo: {
          ...prevState.todo,
          date: ""
        }
      }));
    } else {
      this.setState(prevState => {
        const newMoment = moment(value, "YYYY-MM-DD");
        if (prevState.todo.date !== "") {
          const prevMoment = moment(prevState.todo.date, "YYYY-MM-DD HH:mm Z");
          newMoment.set({
            hour: prevMoment.hour(),
            minute: prevMoment.minute()
          });
        }
        // console.log(newMoment.toString());
        return {
          todo: {
            ...prevState.todo,
            date: newMoment.format("YYYY-MM-DD HH:mm Z")
          }
        };
      });
    }
  }

  handleChangeTime(event) {
    const target = event.target;
    const value = target.value;
    // console.log("Time", value, value.length);
    this.setState(prevState => {
      const newMoment = value
        ? moment(value, "HH:mm")
        : moment("00:00", "HH:mm");
      if (prevState.todo.date !== "") {
        const prevMoment = moment(prevState.todo.date, "YYYY-MM-DD HH:mm Z");
        newMoment.set({
          year: prevMoment.year(),
          month: prevMoment.month(),
          date: prevMoment.date()
        });
      }
      // console.log(newMoment.toString());
      if (!newMoment.isValid()) return;
      return {
        todo: {
          ...prevState.todo,
          date: newMoment.format("YYYY-MM-DD HH:mm Z")
        }
      };
    });
  }

  render() {
    const { open, onCancel, onSave } = this.props;
    const todo = this.state.todo;
    return (
      <Dialog open={open} onClose={() => onCancel()}>
        <DialogTitle>Reminder</DialogTitle>
        <DialogContent>
          <TextField
            name="id"
            label="ID"
            margin="dense"
            disabled
            fullWidth
            value={todo.id}
            onChange={this.handleChangeText}
          />
          <TextField
            name="title"
            label="Title"
            margin="dense"
            fullWidth
            value={todo.title}
            onChange={this.handleChangeText}
          />
          <TextField
            name="description"
            label="Description"
            margin="dense"
            fullWidth
            multiline
            rows="3"
            value={todo.description}
            onChange={this.handleChangeText}
          />
          <TextField
            name="date"
            type="date"
            label="Due Date"
            margin="dense"
            value={
              todo.date === ""
                ? ""
                : moment(todo.date, "YYYY-MM-DD HH:mm Z").format("YYYY-MM-DD")
            }
            onChange={this.handleChangeDate}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            name="time"
            type="time"
            label="Time"
            margin="dense"
            value={
              todo.date === ""
                ? ""
                : moment(todo.date, "YYYY-MM-DD HH:mm Z").format("HH:mm")
            }
            onChange={this.handleChangeTime}
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => onSave(this.state.todo)}
          >
            Save
            <SaveIcon />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TodoDetail.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool
  }),
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

export default TodoDetail;
