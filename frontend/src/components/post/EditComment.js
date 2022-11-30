import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../features/actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ postId, comment, setIsUpdated }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(updateComment(postId, comment._id, text));
      setText("");
      setIsUpdated(false);
    } else {
      setIsUpdated(false);
    }
  };
  console.log(comment);
  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);
  return (
    <div className="edit-comment">
      {author && (
        <form action="" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setIsUpdated(false)}>
            Editer
          </label>
          <input
            type="text"
            id="text"
            defaultValue={comment.text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="Valider" />
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
