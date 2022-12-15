import React, { useEffect, useState } from "react";

const AuthRequired = () => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState("");
  const url = window.location.pathname;
  const params = new URLSearchParams(url);

  useEffect(() => {
    const checkPage = () => {
      setTitle("Vous n'êtes pas authentifié");
      if (params.has("/profil")) {
        setPage("Veuillez vous identifier afin d'accéder à votre profil");
      } else if (params.has("/home")) {
        setPage("Veuillez vous identifier afin d'accéder à la page d'acceuil");
      }
    };
    setInterval(() => {
      checkPage();
    }, 2000);
  });

  return (
    <div className="auth-container">
      <div className="auth-content"></div>
      <h2>{title}</h2>
      <p id="auth">{page}</p>
    </div>
  );
};

export default AuthRequired;
