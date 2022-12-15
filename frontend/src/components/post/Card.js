import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../../utils/utils";
import { updatePost } from "../../features/actions/post.actions";
import DeletePost from "./DeletePost";
import Like from "./Like";
import CardComment from "./CardComment";

const Card = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };
  console.log(post.picture);
  return (
    <li className="card-container" key={post._id}>
      <div className="card-header">
        <img
          src={
            usersData[0] &&
            usersData
              .map((users) => {
                if (users._id === post.posterId) {
                  return users.picture;
                } else {
                  return null;
                }
              })
              .join("")
          }
          className="profil-pict"
          alt="poster-pict"
        />
        <div className="pseudo">
          <h3>
            {usersData[0] &&
              usersData.map((users) => {
                if (users._id === post.posterId) {
                  return users.firstName + " " + users.lastName;
                } else {
                  return null;
                }
              })}
          </h3>
        </div>
      </div>
      <div className="card-content">
        {(userData._id === post.posterId || userData.isAdmin === true) && (
          <div className="dropDown-container">
            <img src="./img/icons/ellipsis.svg" alt="ellipsis-icon" />
            <div className="dropDown-content">
              <p onClick={(e) => setIsUpdated(!isUpdated)}>Modifier</p>
              <DeletePost id={post._id} />
            </div>
          </div>
        )}
        {isUpdated === false && <p className="message">{post.message}</p>}
        {isUpdated && (
          <div className="update-container">
            <textarea
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            ></textarea>
            <div className="button-container">
              <button onClick={updateItem}>Valider les modifications</button>
            </div>
          </div>
        )}
        {post.picture && (
          <a href={post.picture} target="_bla">
            <img className="post-pict" src={post.picture} alt="post-pict" />
          </a>
        )}
        <p className="date">Posté le : {dateParser(post.createdAt)}</p>
      </div>
      <div className="card-footer">
        <div className="comment-icon">
          <span>{post.comments.length}</span>
          <img
            src="./img/icons/comment.svg"
            onClick={() => setShowComment(!showComment)}
            alt="comment-icon"
          />
        </div>
        <Like post={post} />
      </div>
      {showComment && (
        <CardComment post={post} usersData={usersData} userData={userData} />
      )}
    </li>
  );
};

export default Card;
