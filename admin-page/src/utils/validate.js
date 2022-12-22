//check empty field
export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

//check email format
export const isEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const isPassword = (password) => {
  const re =
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
  return re.test(password);
};
//check password length
export const isLength = (password) => {
  if (password.lenght < 6) return true;
  return false;
};
export const isVietnamesePhoneNumberValid = (phoneNumber) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phoneNumber);
};
