import React, {Component} from "react";
import axios from "axios";
import update from "immutability-helper";
import Task from './Task'

class TodoListsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
      title: '',
      description: '',
      done: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (!this.state.title) {
      alert('Please add a task')
      return
    }

    this.newTdlist()
  }

  loadTdlists() {
    axios
      .get("/api/v1/todo_lists")
      .then((res) => {
        this.setState({tdlists: res.data});
      })
      .catch((error) => console.log(error));
  }

  newTdlist () {
      axios
        .post("/api/v1/todo_lists", {tdlist: {title: this.state.title, description: this.state.description, done: this.state.done }})
        .then((res) => {
          const tdlists = update(this.state.tdlists, {
            $splice: [[0, 0, res.data]],
          });

          this.setState({
            tdlists: tdlists,
            title: '',
            description: '',
            done: false,
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
        <div className="taskContainer">
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Task</label>
              <input
                type='text'
                className="newTask"
                placeholder='Add Task'
                value={this.state.title}
                onChange={(e) => this.setState({title: e.target.value})}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type='text'
                className="newTask"
                placeholder='Add Description'
                value={this.state.description}
                onChange={(e) => this.setState({description: e.target.value})}
              />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
          </form>
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist, index) => {
              return (
                <Task key={index} tdlist={tdlist} onChange={this.modifyTdlist} onClick={this.removeTdlist} />
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default TodoListsContainer;