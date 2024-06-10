export const UpdateUserByAdminDto = (body) => ({
  full_name: body.full_name,
  email: body.email,
  role_id: body.role_id,
});
