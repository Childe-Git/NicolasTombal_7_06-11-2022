import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./features/actions/user.actions";
import Routes from "./routes/Index";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/access_token",
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => {
        console.log("No token", err);
      });
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
