import { CREATED, SuccessResponse } from '@/response/success.response.js';
import userService from '@/services/user.service';
import authService from '@/services/auth.service';

class authController {
  static register = async (req, res) => {
    const { full_name, email, password, confirm_password, role } = req.body;
    const userDto = { full_name, email, password, confirm_password, role };
    new CREATED({
      metadata: await userService.createUser(userDto),
    }).send(res);
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    new SuccessResponse({
      metadata: await authService.login(email, password),
    }).send(res);
  };
}
export default authController;
