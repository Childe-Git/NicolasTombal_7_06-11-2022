import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import NewPost from "./NewPost";

const Thread = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <div className="thread-container">
      <h1>Fil d'actualité</h1>
      {posts[0] ? (
        <ul>
          {posts[0] &&
            posts.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </ul>
      ) : (
        <div className="no-post-container">
          <div className="no-post-content">
            <h1>Oops...</h1>
            <p>
              On dirait qu'il n'y a aucun poste pour le moment, réessayez plus
              tard !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thread;
