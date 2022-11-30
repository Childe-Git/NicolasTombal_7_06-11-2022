import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../features/actions/user.actions";
import { UidContext } from "../AppContext";
import UploadImg from "./UploadImg";
import { dateParser } from "../../utils/utils";
import AuthRequired from "../AuthRequired";

const UserProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  const showRightModal = (e) => {
    e.preventDefault();
    const rightModal = document.getElementById("right-modal");
    const leftModal = document.getElementById("left-modal");
    rightModal.style.display = "block";
    rightModal.className += " right-anim";
    leftModal.classList.remove("backward");
    leftModal.className += " left-anim";
    setShowRight(true);
  };

  const hideRightModal = (e) => {
    const rightModal = document.getElementById("right-modal");
    const leftModal = document.getElementById("left-modal");
    leftModal.classList.remove("left-anim");
    rightModal.classList.remove("right-anim");
    leftModal.className += " backward";
    rightModal.style.display = "none";
    setShowRight(false);
  };
  return (
    <>
      {uid ? (
        <div className="page-container">
          <h1>Profil de {userData.firstName}</h1>
          <div className="update-container">
            <div className="left-part part" id="left-modal">
              <img className="picture" src={userData.picture} alt="user-pict" />
              {showRight ? (
                <img
                  id="caret-left"
                  className="caret"
                  src="./img/icons/caret-left.svg"
                  alt="caret-right"
                  onClick={hideRightModal}
                />
              ) : (
                <img
                  id="caret-right"
                  className="caret"
                  src="./img/icons/caret-right.svg"
                  alt="caret-right"
                  onClick={showRightModal}
                />
              )}

              <UploadImg />
              {showRight ? (
                <img
                  id="caret-left"
                  className="caret-down"
                  src="./img/icons/caret-up.svg"
                  alt="caret-right"
                  onClick={hideRightModal}
                />
              ) : (
                <img
                  id="caret-right"
                  className="caret-down"
                  src="./img/icons/caret-down.svg"
                  alt="caret-right"
                  onClick={showRightModal}
                />
              )}
            </div>
            <div className="right-part part" id="right-modal">
              <div className="bio-update">
                <h2>Biographie</h2>
                {updateForm === false && (
                  <>
                    <p
                      className="bio"
                      onClick={() => setUpdateForm(!updateForm)}
                    >
                      {userData.bio}
                    </p>

                    <button
                      className="modifBio"
                      onClick={() => setUpdateForm(!updateForm)}
                    >
                      Modifier la bio
                    </button>
                    <p className="createdDate">
                      Membre depuis le :{dateParser(userData.createdAt)}
                    </p>
                    <p className="updatedDate">
                      Profil mis à jour le :{dateParser(userData.updatedAt)}
                    </p>
                  </>
                )}
                {updateForm && (
                  <>
                    <textarea
                      type="text"
                      maxLength="80"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <br />
                    <button className="modif" onClick={handleUpdate}>
                      Valider les modifications
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AuthRequired />
      )}
    </>
  );
};

export default UserProfil;
