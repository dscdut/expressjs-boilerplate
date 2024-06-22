import { RegisterDto, LoginDto } from '@/modules/auth/dto';
import { AuthService } from '@/modules/auth/service';
import { CreatedResponse, SuccessResponse } from '@/response/success.response.js';

class authController {
  static register = async (req, res) => {
    new CreatedResponse({
      data: await AuthService.register(RegisterDto(req.body)),
    }).send(res);
  };

  static login = async (req, res) => {
    new SuccessResponse({
      data: await AuthService.login(LoginDto(req.body)),
    }).send(res);
  };
}
export default authController;
