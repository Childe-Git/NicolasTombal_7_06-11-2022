import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Thread from "../components/post/Thread";
import AuthRequired from "../components/AuthRequired";
import NewPost from "../components/post/NewPost";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div className="home-page">
        {uid ? (
          <>
            <NewPost />
            <div className="thread-modal">
              <Thread />
            </div>
          </>
        ) : (
          <>
            <AuthRequired />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
