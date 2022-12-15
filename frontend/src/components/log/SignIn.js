import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    const passwordError = document.getElementsByClassName("password-error")[0];
    const emailError = document.getElementsByClassName("email-error")[0];

    passwordError.innerHTML = "";
    emailError.innerHTML = "";

    axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          if (err.response.data.message.includes("Mot")) {
            passwordError.innerHTML = err.response.data.message;
          }
          if (err.response.data.message.includes("Adresse")) {
            emailError.innerHTML = err.response.data.message;
          }
        }
      });
  };

  const viewPass = () => {
    const viewPass = document.getElementById("viewPass");

    viewPass.addEventListener("mouseenter", function (e) {
      e.target.previousElementSibling.setAttribute("type", "text");
      e.target.style.opacity = 0.5;
    });
    viewPass.addEventListener("mouseleave", function (e) {
      e.target.previousElementSibling.setAttribute("type", "password");
      e.target.style.opacity = 0.7;
    });
  };

  return (
    <form action="" id="form" onSubmit={handleSignIn}>
      <label htmlFor="email">Adresse mail</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <div className="email-error err"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <img
        src="./img/icons/eye.svg"
        alt="eye"
        id="viewPass"
        onMouseEnter={viewPass}
      />
      <br />
      <div className="password-error err"></div>
      <br />
      <button type="submit" className="log-button" value="Se connecter">
        Se connecter
      </button>
    </form>
  );
};

export default SignIn;
