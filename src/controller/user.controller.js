import { PaginateDto, UpdateUserByAdminDto, UpdateUserByOwnerDto } from '@/modules/user/dto';
import { UserService } from '@/modules/user/service';
import { NoContent, SuccessResponse } from '@/response/success.response.js';

class userController {
  static updateUserByOwner = async (req, res) => {
    const userId = req.user.id;
    new SuccessResponse({
      data: await UserService.updateUser(userId, UpdateUserByOwnerDto(req.body)),
    }).send(res);
  };

  static updateUserByAdmin = async (req, res) => {
    const userId = req.params?.id;
    const adminId = req.user.id;
    new SuccessResponse({
      data: await UserService.updateUser(userId, UpdateUserByAdminDto(req.body), adminId),
    }).send(res);
  };

  static deleteUser = async (req, res) => {
    const userId = req.params?.id;
    await UserService.deleteUser(userId);
    new NoContent({}).send(res);
  };

  static getUsers = async (req, res) => {
    new SuccessResponse({
      data: await UserService.getUsers(PaginateDto(req.query)),
    }).send(res);
  };
}
export default userController;
