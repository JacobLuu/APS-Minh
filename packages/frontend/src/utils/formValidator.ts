export const emailRegex =
  /^[A-Za-z0-9]{1}[A-Za-z0-9+_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(!|@|#|\$|%|\^|&|\*|"|'|\(|\)|\+|,|-|\.|\/|:|;|<|=|>|\?|\\|]|\[|\]|_|`|{|}|\||~))([a-z]|[A-Z]|\d|!|@|#|\$|%|\^|&|\*|"|'|\(|\)|\+|,|-|\.|\/|:|;|<|=|>|\?|\\|]|\[|\]|_|`|{|}|\||~)+$/;

export const OVERALL_SCORE_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  min: { value: 0, message: "Score must be between 0-10." },
  max: { value: 10, message: "Score must be between 0-10." },
};

export const REQUIRED_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
};

export const TRIMMED_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  validate: {
    notEmpty: (value: string) =>
      value.trim() !== "" || "This field must not be empty.",
  },
};

export const MAX_500_CHARACTERS_VALIDATION_RULES = {
  validate: {
    notEmpty: (value: string) =>
      value.trim() !== "" || "This field must not be empty.",
  },
  maxLength: {
    value: 500,
    message: "Text must have max length of 500 characters.",
  },
  minLength: {
    value: 1,
    message: "Text must have min length of 1 characters.",
  },
};

export const MAX_500_CHARACTERS_OPTIONAL_RULES = {
  maxLength: {
    value: 500,
    message: "Text must have max length of 500 characters.",
  },
};

export const MAX_200_CHARACTERS_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  validate: {
    notEmpty: (value: string) =>
      value.trim() !== "" || "This field must not be empty.",
  },
  maxLength: {
    value: 200,
    message: "Text must have max length of 200 characters.",
  },
  minLength: {
    value: 1,
    message: "Text must have min length of 1 characters.",
  },
};

export const EMAIL_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  pattern: {
    value: emailRegex,
    message: "Email is not valid.",
  },
};

export const PROFILE_NAME_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  maxLength: {
    value: 255,
    message: "Text must have max length of 255 characters.",
  },
  pattern: /\S/,
};

export const PASSWORD_VALIDATION_RULES = {
  required: { value: true, message: "This field must not be empty." },
  minLength: {
    value: 8,
    message: "Text must have min length of 8 characters.",
  },
  maxLength: {
    value: 30,
    message: "Text must have max length of 30 characters.",
  },
  pattern: passwordRegex,
};

export const SCORE_VALIDATION_RULES = {
  min: { value: 0, message: "Score must be between 0-10." },
  max: { value: 10, message: "Score must be between 0-10." },
};

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const isNone = (value: string): boolean =>
  value === "None" || value === "" || value === null || value === undefined;

export default {
  isValidEmail,
  isValidPassword,
  isNone,
};
