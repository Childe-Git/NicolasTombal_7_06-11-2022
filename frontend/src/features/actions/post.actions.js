import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = " UPDATE_POST";
export const DELETE_POST = " DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = (num) => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: "http://localhost:5000/api/post",
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/post",
      data,
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: ADD_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: "http://localhost:5000/api/post/like-post/" + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: "http://localhost:5000/api/post/unlike-post/" + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "http://localhost:5000/api/post/" + postId,
      data: { message },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: UPDATE_POST, payload: { postId, message } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: "http://localhost:5000/api/post/" + postId,
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterFirstName) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: "http://localhost:5000/api/post/comment-post/" + postId,
      data: { commenterId, text, commenterFirstName },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({
          type: ADD_COMMENT,
          payload: { postId, text },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: "http://localhost:5000/api/post/edit-comment-post/" + postId,
      data: { commentId, text },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({
          type: UPDATE_COMMENT,
          payload: { postId, commentId, text },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch, getState) => {
    return await axios({
      method: "patch",
      url: "http://localhost:5000/api/post/delete-comment-post/" + postId,
      data: { commentId },
      withCredentials: true,
    })
      .then((res) => {
        return dispatch({
          type: DELETE_COMMENT,
          payload: { postId, commentId },
        });
      })
      .catch((err) => console.log(err));
  };
};
