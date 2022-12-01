import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SignIn";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [welcome, setWelcome] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    // On cible ces élements pour y injecter du html
    const lastNameError = document.getElementById("lastName-error");
    const firstNameError = document.getElementById("firstName-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const controlPasswordError = document.getElementById(
      "controlPassword-error"
    );

    lastNameError.innerHTML = "";
    firstNameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    controlPasswordError.innerHTML = "";

    if (password !== controlPassword || password.length < 6) {
      if (password !== controlPassword) {
        controlPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (password < 6) {
        passwordError.innerHTML = "Mot de passe trop court";
      }
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/user/register",
        withCredentials: true,
        data: {
          lastName,
          firstName,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setFormSubmit(true);
            setWelcome("Bienvenue " + res.data.firstName);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            lastNameError.innerHTML = err.response.data.lastName;
            firstNameError.innerHTML = err.response.data.firstName;
            emailError.innerHTML = err.response.data.email;
          }
        });
    }
  };

  const viewPass = () => {
    const viewPass = document.getElementById("viewPass");
    const viewConfirmPass = document.getElementById("viewConfirmPass");

    viewPass.addEventListener("mouseenter", function (e) {
      e.target.previousElementSibling.setAttribute("type", "text");
      e.target.style.opacity = 0.5;
    });
    viewPass.addEventListener("mouseleave", function (e) {
      e.target.previousElementSibling.setAttribute("type", "password");
      e.target.style.opacity = 0.7;
    });

    viewConfirmPass.addEventListener("mouseenter", function (e) {
      e.target.previousElementSibling.setAttribute("type", "text");
      e.target.style.opacity = 0.5;
    });
    viewConfirmPass.addEventListener("mouseleave", function (e) {
      e.target.previousElementSibling.setAttribute("type", "password");
      e.target.style.opacity = 0.7;
    });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <div className="firstSignUp">
            <h2>{welcome}</h2>
          </div>
          <SignIn />
        </>
      ) : (
        <form action="" id="form" onSubmit={handleSignUp}>
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <div className="err" id="lastName-error"></div>
          <br />
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <div className="err" id="firstName-error"></div>
          <br />
          <label htmlFor="email">Adresse mail</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="err" id="email-error"></div>
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
          <div className="err" id="password-error"></div>
          <br />
          <label htmlFor="controlPassword">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <img
            src="./img/icons/eye.svg"
            alt="eye"
            id="viewConfirmPass"
            onMouseEnter={viewPass}
          />
          <div className="err" id="controlPassword-error"></div>
          <br />
          <button
            type="submit"
            className="log-button"
            value="Valider l'inscription"
          >
            Valider l'inscription
          </button>
        </form>
      )}
    </>
  );
};

export default SignUp;
