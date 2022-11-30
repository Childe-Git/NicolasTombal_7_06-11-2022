import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment, getPosts } from "../../features/actions/post.actions";

const DeleteComment = ({ postId, comment }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteComment(postId, comment))
      .then(() => dispatch(getPosts()))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p
        onClick={() => {
          if (window.confirm("Voulez vous supprimer ce commentaire ?"))
            handleDelete();
        }}
      >
        Supprimer
      </p>
    </div>
  );
};

export default DeleteComment;
