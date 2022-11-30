import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../components/AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../features/actions/post.actions";

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    // Si l'array de likers contient un uid on set le like sur true sinon sur false
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
    // Pour raffraichir l'useEffect on y met uid, post.likers, liked,
    // donc à chacun de ces évenement l'useEffect se rejoue
  }, [uid, post.likers, liked]);
  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="heart" />
      )}
      {uid && liked && (
        <img
          className="heart-filled-anim"
          src="./img/icons/heart-filled.svg"
          onClick={unlike}
          alt="heart-filled"
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default Like;
