import validator from 'validator';

// Login Validator
export const loginValidator = (data) => {
  let errors = {};
  if (!validator.isEmail(data.email)) errors.email = 'Please enter valid email address.';
  if (validator.isEmpty(data.email)) errors.email = 'Please enter your email address.';
  if (validator.isEmpty(data.password)) errors.password = 'Please enter your password.';
  return {errors, isValid: Object.keys(errors).length <= 0}
};

// sign-up Validator
export const signUpValidator = (data) => {
  let errors = {};
  if (!validator.isEmail(data.email)) errors.email = 'Please enter valid email address.';
  if (validator.isEmpty(data.email)) errors.email = 'Please enter your email address.';
  if (!validator.matches(data.password, /(?=.*\d)(?=.*[a-z])(?=.*\W)/)) errors.password = 'Password must be a combination of letters, one special character, and a number.';
  if (!validator.isByteLength(data.password, {min: 6})) errors.password = 'Password should be minimum 6 characters.';


  if (validator.isEmpty(data.confirm_password)) errors.confirm_password = 'Please enter your confirm password.';
  if (data.password !== data.confirm_password) errors.confirm_password = 'Entered password and confirm password must be the same.';
  if (!data.condition) errors.condition = 'Please accept the Terms & Conditions.';
  return {errors, isValid: Object.keys(errors).length <= 0}
};

// forget-password Validator
export const forgetPasswordValidator = (data) => {
  let errors = {};
  if (!validator.isEmail(data.email)) errors.email = 'Please enter valid email address.';
  if (validator.isEmpty(data.email)) errors.email = 'Please enter your email address.';
  return {errors, isValid: Object.keys(errors).length <= 0}
};

// reset-password Validator
export const resetPasswordValidator = (data) => {
  let errors = {};
  if (!validator.matches(data.password, /(?=.*\d)(?=.*[a-z])(?=.*\W)/)) errors.password = 'Password must be a combination of letters, one special character, and a number.';
  if (!validator.isByteLength(data.password, {min: 6})) errors.password = 'Password should be minimum 6 characters.';


  if (validator.isEmpty(data.confirm_password)) errors.confirm_password = 'Please enter your confirm password.';
  if (data.password !== data.confirm_password) errors.confirm_password = 'Entered password and confirm password must be the same.';
  return {errors, isValid: Object.keys(errors).length <= 0}
};

// reset-password Validator
export const changePasswordValidator = (data) => {
  let errors = {};

  if (validator.isEmpty(data.old_password)) errors.old_password = 'Please enter old password.';

  if (!validator.matches(data.password, /(?=.*\d)(?=.*[a-z])(?=.*\W)/)) errors.password = 'Password must be a combination of letters, one special character, and a number.';
  if (!validator.isByteLength(data.password, {min: 6})) errors.password = 'Password should be minimum 6 characters.';
  if (validator.isEmpty(data.password)) errors.password = 'Please enter new password.';


  if (validator.isEmpty(data.confirm_password)) errors.confirm_password = 'Please enter your confirm password.';
  if (data.password !== data.confirm_password) errors.confirm_password = 'Entered password and confirm password must be the same.';
  return {errors, isValid: Object.keys(errors).length <= 0}
};

// verify-email Validator
export const verifyOtpValidator = (data) => {
  let errors = {};
  if (data.otp.length < 4) errors.otp = 'Please enter valid code.'
  if (validator.isEmpty(data.otp)) errors.otp = 'Please enter code.'

  return {errors, isValid: Object.keys(errors).length <= 0}
};
