export const RegisterDto = (body) => ({
  full_name: body.full_name,
  email: body.email,
  password: body.password,
  confirm_password: body.confirm_password,
});
