import { PaginationDto } from '@/core/pagination/dto/pagination.dto';
import { UpdateUserByAdminDto, UpdateUserByOwnerDto } from '@/modules/user/dto';
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
    new NoContent().send(res);
  };

  static getUsersPagination = async (req, res) => {
    const { sort } = req.query;
    let sortCriteria;
    if (sort) {
      sortCriteria = sort.split(',').map((item) => {
        const [field, order] = item.split(':');
        return [field, order];
      });
    }
    const paginationDto = PaginationDto({ ...req.query, sort: sortCriteria });
    new SuccessResponse({
      data: await UserService.getUsersPagination(paginationDto),
    }).send(res);
  };
}
export default userController;
