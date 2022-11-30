import React, { useEffect, useState } from "react";

const AuthRequired = () => {
  const [page, setPage] = useState("");
  const url = window.location.pathname;
  const params = new URLSearchParams(url);

  useEffect(() => {
    const checkPage = () => {
      if (params.has("/profil")) {
        setPage("Veuillez vous identifier afin d'accéder à votre profil");
      } else if (params.has("/home")) {
        setPage("Veuillez vous identifier afin d'accéder à la page d'acceuil");
      }
    };
    checkPage();
  });

  return (
    <div className="auth-container">
      <div className="auth-content"></div>
      <h2>Vous n'êtes pas authentifié</h2>
      <p id="auth">{page}</p>
    </div>
  );
};

export default AuthRequired;
