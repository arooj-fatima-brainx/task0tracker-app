import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import update from "immutability-helper";

const initialState = {
  tdlists: [],
  isLoading: false
}

const tdlistContainer = createSlice({
  name: 'todoListsContainer',
  initialState,
  reducers: {
    loadTdlists: (state) => {
      state.isLoading = true
    },
    loadingTdlistFailed: (state) => {
      state.isLoading = false
    },
    addNewTdList: (state, action) => {
      const tdlists = update(state.tdlists, {
        $splice: [[0, 0, action.payload]],
      });
      state.tdlists = tdlists
    },
    toggleCheck: (state, action) => {
      const tdlistIndex = state.tdlists.findIndex(
        (x) => x.id === action.payload.id
      );
      const tdlists = update(state.tdlists, {
        [tdlistIndex]: {$set: action.payload},
      });
      state.tdlists = tdlists
    },
    deleteTdlist: (state, action) => {
      const tdlistIndex = state.tdlists.findIndex((x) => x.id === action.payload);
      const tdlists = update(state.tdlists, {
        $splice: [[tdlistIndex, 1]],
      });
      state.tdlists = tdlists
    },
    updateTodoList: (state, action) => {
      const tdlistIndex = state.tdlists.findIndex(
        (x) => x.id === action.payload.id
      );
      const tdlists = update(this.state.tdlists, {
        [tdlistIndex]: {$set: action.payload},
      });
      state.tdlists = tdlists
    },
    getTasks: (state, action) => {
      state.isLoading = false
      state.tdlists = action.payload
    }
  }
})

export const getTdlists = (dispatch) => {
  dispatch(loadTdlists())
  axios
    .get("/api/v1/todo_lists")
    .then((res) => {
      dispatch(getTasks(res.data))
    })
    .catch((error) => {
      dispatch(loadingTdlistFailed())
    });
}

export const onSubmit = (e, title, description, dispatch) => {
  e.preventDefault()
  if (!title) {
    alert('Please add a task')
    return
  }

  newTdlist(title, description, dispatch)
}

export const newTdlist = (title, description, dispatch) => {
  axios
    .post("/api/v1/todo_lists", {
      tdlist: {
        title: title,
        description: description,
      }
    })
    .then((res) => {
      dispatch(addNewTdList(res.data))
    })
    .catch((error) => console.log(error));
};

export const modifyTdlist = (e, id, dispatch) => {
  axios
    .put(`/api/v1/todo_lists/${id}`, {tdlist: {done: e.target.checked}})
    .then((res) => {
      dispatch(toggleCheck(res.data))
    })
    .catch((error) => console.log(error));
};

export const removeTdlist = (id, dispatch) => {
  axios
    .delete(`/api/v1/todo_lists/${id}`)
    .then((res) => {
      dispatch(deleteTdlist(id))
    })
    .catch((error) => console.log(error));
};

export const editTdList = (e, id, title, description, dispatch) => {
  e.preventDefault()

  if (!title) {
    alert('Please add a task')
    return
  }

  updateTdlist(id, title, description, dispatch)
}

export const updateTdlist = (id, title, description, dispatch) => {
  axios
    .put(`/api/v1/todo_lists/${id}`, {tdlist: {title: title, description: description}})
    .then((res) => {
      dispatch(updateTodoList(res.data))
    })
    .catch((error) => console.log(error));
};

export default tdlistContainer.reducer
export const { loadTdlists, getTasks, loadingTdlistFailed, addNewTdList, toggleCheck, deleteTdlist, updateTodoList } = tdlistContainer.actions