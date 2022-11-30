import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, getPosts } from "../../features/actions/post.actions";
import { dateParser } from "../../utils/utils";
import DeleteComment from "./DeleteComment";
import EditDeleteComment from "./EditComment";

const CardComment = ({ post, userData, usersData }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleComment = (e) => {
    if (text) {
      e.preventDefault();
      dispatch(addComment(post._id, userData._id, text, userData.firstName))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    } else {
      e.preventDefault();
      const textId = document.getElementById("text");
      textId.className = "empty";
      textId.placeholder = "Veuillez écrire quelque chose...";
      const timer = setTimeout(() => {
        textId.placeholder = "Laissez un commentaire";
        textId.classList.remove("empty");
      }, 10000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <div className="comments-container">
      <h4>Commentaires</h4>
      {post.comments[-0] &&
        post.comments.map((comment) => {
          return (
            <div
              className={
                comment.commenterId === userData._id
                  ? "comment-container client"
                  : "comment-container"
              }
              key={comment._id}
            >
              <div className="comment-header">
                <img
                  src={
                    usersData[0] &&
                    usersData
                      .map((users) => {
                        if (users._id === comment.commenterId) {
                          return users.picture;
                        } else {
                          return null;
                        }
                      })
                      .join("")
                  }
                  alt="users-pict"
                />
                <div className="pseudo">
                  <h3>{comment.commenterFirstName}</h3>
                </div>
              </div>
              {userData._id === comment.commenterId && (
                <div className="dropDown-container">
                  <img src="./img/icons/ellipsis.svg" alt="ellipsis-icon" />
                  <div className="dropDown-content">
                    <p onClick={(e) => setIsUpdated(comment._id)}>Modifier</p>
                    <DeleteComment comment={comment} postId={post._id} />
                  </div>
                </div>
              )}
              <div className="comment-content">
                {isUpdated === comment._id ? (
                  <EditDeleteComment
                    comment={comment}
                    postId={post._id}
                    setIsUpdated={setIsUpdated}
                  />
                ) : (
                  <p>{comment.text}</p>
                )}
              </div>
              <p className="date">{dateParser(comment.createdAt)}</p>
            </div>
          );
        })}
      <div className="comment-form">
        <form action="" onSubmit={handleComment} className="form">
          {/* <label htmlFor="text">Quelque chose à dire ? </label> */}
          <textarea
            type="text"
            id="text"
            placeholder="Laissez un commentaire..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">
              <img src="./img/icons/send.svg" alt="send" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardComment;
