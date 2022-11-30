import { createReducer } from "@reduxjs/toolkit";
import {
  GET_USER,
  GET_USER_REJECTED,
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_REJECTED,
  UPDATE_BIO,
  UPDATE_BIO_REJECTED,
} from "../actions/user.actions";

const initialState = {
  data: null,
  err: null,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(GET_USER, (draft, action) => {
      return action.payload;
    })
    .addCase(GET_USER_REJECTED, (draft, action) => {
      draft.error = action.payload;
      return;
    })
    .addCase(UPLOAD_PICTURE, (draft, action) => {
      draft.data = action.payload;
      return;
    })
    .addCase(UPLOAD_PICTURE_REJECTED, (draft, action) => {
      draft.error = action.payload;
      return;
    })
    .addCase(UPDATE_BIO, (draft, action) => {
      draft.bio = action.payload;
      return;
    })
    .addCase(UPDATE_BIO_REJECTED, (draft, action) => {
      draft.error = action.payload;
      return;
    });
});
