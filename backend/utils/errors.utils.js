exports.signUpErrors = (err) => {
  let errors = { lastName: "", firstName: "", email: "" };

  if (err.message.includes("lastName")) {
    errors.lastName = "Nom trop court";
  }
  if (err.message.includes("firstName")) {
    errors.firstName = "Prénom trop court";
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Adresse mail déjà utilisée";
  }

  return errors;
};
