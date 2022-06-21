import axios from "axios";
import {
  addNewTdList, deleteTdlist,
  getTasks,
  loadingTdlistFailed,
  loadTdlists, toggleCheck, updateTodoList
} from "../features/todolistContainer/todolitsContainer";

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
