import { UserService } from '@/modules/user/service';

export class AuthService {
  static register = async (userDto) => {
    const user = await UserService.createUser(userDto);
    return user;
  };
}
