import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../features/actions/post.actions";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState("");

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handlePost = async () => {
    if (message || picture) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) {
        data.append("image", file);
      }

      await dispatch(addPost(data));
      dispatch(getPosts());
      clearPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const clearPost = () => {
    setMessage("");
    setPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      <div className="post-content">
        <textarea
          name=""
          id=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Quoi de neuf ${userData.firstName} ?`}
        ></textarea>
        <br />
        <div className="input-img">
          <img src="./img/icons/img.svg" alt="img" />
          <input type="file" id="file" name="file" onChange={handlePicture} />
        </div>
      </div>

      {(message || picture) && (
        <>
          <div className="newPost-container">
            <div className="newPost-header">
              <NavLink to="/profil" className="link">
                <img src={userData.picture} alt="user-pict" />
              </NavLink>
              <div className="pseudo">
                <h3>{userData.firstName + " " + userData.lastName}</h3>
              </div>
            </div>
            <div className="newPost-content">
              <p>{message}</p>

              {picture && <img src={picture} alt="post-pict" />}
            </div>
            <div className="button-container">
              <button onClick={clearPost}>X</button>
              <button type="submit" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </>
      )}
      <div className="post-footer"></div>
    </div>
  );
};

export default NewPost;
