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

exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file")) {
    errors.format = "Format incompatible";
  }
  if (err.message.includes("max size")) {
    errors.size = "Le fichier dépasse 500ko";
  }

  return errors;
};
