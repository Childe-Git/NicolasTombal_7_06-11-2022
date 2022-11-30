import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_REJECTED = "GET_USER_REJECTED";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_PICTURE_REJECTED = "UPLOAD_PICTURE_REJECTED";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_BIO_REJECTED = "UPDATE_BIO_REJECTED";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:5000/api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_USER_REJECTED, payload: err });
      });
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`http://localhost:5000/api/user/upload`, data)
      .then((res) => {
        return axios({
          method: "get",
          url: `http://localhost:5000/api/user/${id}`,
          withCredentials: true,
        }).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/user/${userId}`,
      data: { bio },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_BIO_REJECTED, payload: err });
      });
  };
};
