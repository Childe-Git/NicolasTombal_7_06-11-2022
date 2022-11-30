import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {/* Si signUpModal est sur true alors renvoie le formulaire signUp */}
        {signUpModal && <SignUp />}
        {/* Si signInModal est sur true alors renvoie le formulaire SignIn */}
        {signInModal && <SignIn />}
      </div>
    </div>
  );
};

export default Log;
