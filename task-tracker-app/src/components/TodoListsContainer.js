import React, {Component} from "react";
import axios from "axios";
import update from "immutability-helper";

class TodoListsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
      title: '',
      description: '',
      done: false,
      inputValue: ''
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
          debugger
          const tdlists = update(this.state.tdlists, {
            $splice: [[0, 0, res.data]],
          });

          this.setState({
            tdlists: tdlists,
            title: '',
            description: '',
            done: false,
            inputValue: "",
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

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  };

  render() {
    return (
      <div>

        <div className="taskContainer">
          <form className='add-form' onSubmit={this.onSubmit}>
            <div className='form-control'>
              <label>Task</label>
              <input
                type='text'

                placeholder='Add Task'
                value={this.state.title}
                onChange={(e) => this.setState({title: e.target.value})}
              />
            </div>
            <div className='form-control'>
              <label>Day & Time</label>
              <input
                type='text'

                placeholder='Add Day & Time'
                value={this.state.description}
                onChange={(e) => this.setState({description: e.target.value})}
              />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' />
          </form>


          {/*<input*/}
          {/*  className="newTask"*/}
          {/*  type="text"*/}
          {/*  placeholder="Input a New Task and Press Enter"*/}
          {/*  maxLength="75"*/}
          {/*  onKeyPress={this.newTdlist}*/}
          {/*  value={this.state.inputValue}*/}
          {/*  onChange={this.handleChange}*/}
          {/*/>*/}
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist) => {
              return (
                <li className="item" tdlist={tdlist} key={tdlist.id}>
                  <input
                    className="itemCheckbox"
                    type="checkbox"
                    checked={tdlist.done}
                    onChange={(e) => this.modifyTdlist(e, tdlist.id)}
                  />
                  <label className="itemDisplay">{tdlist.title}</label>
                  <span
                    className="removeItemButton"
                    onClick={(e) => this.removeTdlist(tdlist.id)}
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoListsContainer;