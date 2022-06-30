import { createSlice } from "@reduxjs/toolkit";
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
      const tdlists = update(state.tdlists, {
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
export default tdlistContainer.reducer
export const { loadTdlists, getTasks, loadingTdlistFailed, addNewTdList, toggleCheck, deleteTdlist, updateTodoList } = tdlistContainer.actions