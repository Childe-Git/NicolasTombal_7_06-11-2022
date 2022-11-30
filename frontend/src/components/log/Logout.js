import React from "react";
import cookie from "js-cookie";
import axios from "axios";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/user/logout",
      withCredentials: true,
    })
      .then(() => removeCookie("access_token"))
      .catch((err) => console.log(err));

    window.location = "/";
  };
  return <p onClick={logout}>Se déconnecter</p>;
};

export default Logout;
