import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../features/actions/post.actions";

const DeletePost = (post) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post.id))
      .then(() => dispatch(getPosts()))
      .catch((err) => console.log(err));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce poste ?")) {
          handleDelete();
        }
      }}
    >
      <p>Supprimer</p>
    </div>
  );
};

export default DeletePost;
