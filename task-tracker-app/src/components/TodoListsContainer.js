import React, {Component} from "react";
import axios from "axios";
import update from "immutability-helper";
import Task from './Task'
import AddTask from './AddTask'

class TodoListsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
    };
  }

  onSubmit = (e, title, description) => {
    e.preventDefault()

    if (!title) {
      alert('Please add a task')
      return
    }

    this.newTdlist(title, description)
  }

  editTdList = (e, id, title, description) => {
    e.preventDefault()

    if (!title) {
      alert('Please add a task')
      return
    }

    this.updateTdlist(id, title, description)
  }

  loadTdlists() {
    axios
      .get("/api/v1/todo_lists")
      .then((res) => {
        this.setState({tdlists: res.data});
      })
      .catch((error) => console.log(error));
  }

  newTdlist(title, description) {
    axios
      .post("/api/v1/todo_lists", {
        tdlist: {
          title: title,
          description: description,
        }
      })
      .then((res) => {
        const tdlists = update(this.state.tdlists, {
          $splice: [[0, 0, res.data]],
        });

        this.setState({
          tdlists: tdlists,
        });
      })
      .catch((error) => console.log(error));

  };

  modifyTdlist = (e, id) => {
    axios
      .put(`/api/v1/todo_lists/${id}`, {tdlist: {done: e.target.checked}})
      .then((res) => {
        const tdlistIndex = this.state.tdlists.findIndex(
          (x) => x.id === res.data.id
        );
        const tdlists = update(this.state.tdlists, {
          [tdlistIndex]: {$set: res.data},
        });
        this.setState({
          tdlists: tdlists,
        });
      })
      .catch((error) => console.log(error));
  };

  updateTdlist = (id, title, description) => {
    axios
      .put(`/api/v1/todo_lists/${id}`, {tdlist: {title: title, description: description}})
      .then((res) => {
        const tdlistIndex = this.state.tdlists.findIndex(
          (x) => x.id === res.data.id
        );
        const tdlists = update(this.state.tdlists, {
          [tdlistIndex]: {$set: res.data},
        });
        this.setState({
          tdlists: tdlists,
        });
      })
      .catch((error) => console.log(error));
  };

  removeTdlist = (id) => {
    axios
      .delete(`/api/v1/todo_lists/${id}`)
      .then((res) => {
        const tdlistIndex = this.state.tdlists.findIndex((x) => x.id === id);
        const tdlists = update(this.state.tdlists, {
          $splice: [[tdlistIndex, 1]],
        });
        this.setState({
          tdlists: tdlists,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.loadTdlists();
  }

  render() {
    return (
      <>
        <AddTask onSubmit={this.onSubmit}/>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist, index) => {
              return (
                <Task key={index} tdlist={tdlist} onChange={this.modifyTdlist} onClick={this.removeTdlist}
                      onSubmit={this.editTdList}/>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default TodoListsContainer;