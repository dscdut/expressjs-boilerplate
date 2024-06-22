const validationMessages = {
  FULL_NAME: "Full name must contain only letters, spaces, and characters such as , . - '",
  EMAIL: 'Email must be in a valid format (e.g., user@example.com, user@example.net, user@example.org)',
  PASSWORD: 'Password must be 7-50 characters long, contain at least one digit, and one uppercase letter',
  CONFIRM_PASSWORD: 'Confirm password must match the password',
  ID: 'The provided id is in an invalid format. The ID must be a number greater than 0',
};

export default validationMessages;
