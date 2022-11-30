import { createReducer } from "@reduxjs/toolkit";
import { GET_USERS, GET_USERS_REJECTED } from "../actions/users.actions";

const initialState = {
  data: null,
  err: null,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(GET_USERS, (draft, action) => {
      return action.payload;
    })
    .addCase(GET_USERS_REJECTED, (draft, action) => {
      draft.error = action.payload;
      return;
    });
});
