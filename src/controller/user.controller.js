import { UserService } from '@/modules/user/service';
import { NoContent } from '@/response/success.response.js';

class userController {
  static deleteUser = async (req, res) => {
    const userId = req.params?.id;
    await UserService.deleteUser(userId);
    new NoContent().send(res);
  };
}
export default userController;
