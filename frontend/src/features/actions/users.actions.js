import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_USERS_REJECTED = "GET_USERS_REJECTED";

export const getUsers = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: "http://localhost:5000/api/user",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_USERS_REJECTED, payload: err });
      });
  };
};
