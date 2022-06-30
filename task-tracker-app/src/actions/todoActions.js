import axios from "axios";
import {
  addNewTdList, deleteTdlist,
  getTasks,
  loadingTdlistFailed,
  loadTdlists, toggleCheck, updateTodoList
} from "../features/todolistContainer/todolitsContainer";

export const getTdlists = (dispatch, auth) => {
  dispatch(loadTdlists())
  axios
    .get("/api/v1/todo_lists", getConfig(auth))
    .then((res) => {
      dispatch(getTasks(res.data))
    })
    .catch((error) => {
      alert(error.response.data.errors[0])
      dispatch(loadingTdlistFailed())
    });
}

export const onSubmit = (e, title, description, dispatch, auth) => {
  e.preventDefault()
  if (!title) {
    alert('Please add a task')
    return
  }

  newTdlist(title, description, dispatch, auth)
}

export const newTdlist = (title, description, dispatch, auth) => {

  const body = JSON.stringify({
    tdlist: {
      title: title,
      description: description,
    }
  });
  axios
    .post("/api/v1/todo_lists", body, getConfig(auth))
    .then((res) => {
      dispatch(addNewTdList(res.data))
    })
    .catch((error) => console.log(error));
};

export const modifyTdlist = (e, id, dispatch, auth) => {
  const body = JSON.stringify({tdlist: {done: e.target.checked}});
  axios
    .put(`/api/v1/todo_lists/${id}`, body, getConfig(auth))
    .then((res) => {
      dispatch(toggleCheck(res.data))
    })
    .catch((error) => console.log(error));
};

export const removeTdlist = (id, dispatch, auth) => {
  axios
    .delete(`/api/v1/todo_lists/${id}`, getConfig(auth))
    .then((res) => {
      dispatch(deleteTdlist(id))
    })
    .catch((error) => console.log(error));
};

export const editTdList = (e, id, title, description, dispatch, auth) => {
  e.preventDefault()

  if (!title) {
    alert('Please add a task')
    return
  }

  updateTdlist(id, title, description, dispatch, auth)
}

export const updateTdlist = (id, title, description, dispatch, auth) => {
  axios
    .put(`/api/v1/todo_lists/${id}`, {tdlist: {title: title, description: description}}, getConfig(auth))
    .then((res) => {
      dispatch(updateTodoList(res.data))
    })
    .catch((error) => console.log(error));
};

const getConfig = (auth) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'access-token': auth.accessToken,
      'uid': auth.uid,
      'client': auth.client
    }
  };
  return config;
}