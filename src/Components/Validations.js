export const isValidUserName = (validUserName) => {
  return /^(?=.{0,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
    validUserName
  );
};

export const isValidPassword = (ValidPassword) => {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(ValidPassword);
};

export const isValidEmail = (validEmail) => {
  return /\S+@\S+\.\S+/.test(validEmail);
};

export const isValidPhoneNumber = (validPhoneNumber) => {
  return /^\d{10}$/.test(validPhoneNumber);
};

export const isValidZipCode = (validNumber) => {
  return /^[0-9]+$/.test(validNumber);
};
