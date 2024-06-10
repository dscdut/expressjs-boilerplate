import { RoleRepository } from '../repository';

export class RoleService {
  static getRoleById = async (roleId) => {
    const role = await RoleRepository.findOneBy('id', roleId);
    return role;
  };

  static getRoleByName = async (name) => {
    const role = await RoleRepository.findOneBy('name', name);

    return role;
  };

  static getRoles = async () => {
    return RoleRepository.getRoles();
  };
}
