import { createReducer } from "@reduxjs/toolkit";
import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from "../actions/post.actions";

const initialState = {
  data: null,
  err: null,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(GET_POSTS, (draft, action) => {
      return action.payload;
    })
    .addCase(LIKE_POST, (draft, action) => {
      return draft.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    })
    .addCase(UNLIKE_POST, (draft, action) => {
      return draft.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    })
    .addCase(UPDATE_POST, (draft, action) => {
      return draft.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        }
        return post;
      });
    })

    .addCase(UPDATE_COMMENT, (draft, action) => {
      return draft.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });
    })
    .addCase(DELETE_POST, (draft, action) => {
      return draft.filter((post) => post._id !== action.payload);
    })
    .addCase(DELETE_COMMENT, (draft, action) => {
      draft.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload
            ),
          };
        }
        return post;
      });
    });
});
