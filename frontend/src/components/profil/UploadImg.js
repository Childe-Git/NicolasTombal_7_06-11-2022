import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../features/actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handlePicture = (e) => {
    const data = new FormData();
    data.append("userId", userData._id);
    data.append("image", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" id="form" onSubmit={handlePicture}>
      <label htmlFor="file">Changer sa photo de profil</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button type="submit" value="Envoyer">
        Envoyer
      </button>
    </form>
  );
};

export default UploadImg;
