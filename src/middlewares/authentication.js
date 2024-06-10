import { ROLES } from '@/enum';
import { JwtService } from '@/modules/auth/service';
import { UserService } from '@/modules/user/service';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status';

export const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    throw new ErrorResponse(errorMessages.REQUIRED_TOKEN, UNAUTHORIZED, errorCodes.REQUIRED_TOKEN);
  }

  const userToken = JwtService.verifyToken(token);
  req.user = userToken;
  next();
};

export const isAmdin = async (req, res, next) => {
  const user = await UserService.findUserById(req.user.id);
  if (user.role_id === ROLES.ADMIN.id) {
    next();
  } else {
    throw new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
      errorMessages.ROUTE_NOT_FOUND,
    ]);
  }
};
