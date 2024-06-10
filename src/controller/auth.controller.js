import { RegisterDto } from '@/modules/auth/dto';
import { AuthService } from '@/modules/auth/service';
import { CREATED } from '@/response/success.response.js';

class authController {
  static register = async (req, res) => {
    new CREATED({
      data: await AuthService.register(RegisterDto(req.body)),
    }).send(res);
  };
}
export default authController;
