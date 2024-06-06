import { ROLES } from '@/enum';
import { JwtService } from '@/modules/auth/service';
import { ErrorResponse } from '@/response/error.response';
import { statusCodes, errorCodes, errorMessages } from '@/response/httpResponse';

export const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    throw new ErrorResponse(errorMessages.INVALID_SYNTAX, statusCodes.UNAUTHORIZED, errorCodes.INVALID_SYNTAX);
  }

  const userToken = JwtService.verifyToken(token);
  if (!userToken) {
    throw new ErrorResponse(errorMessages.DONT_PERMISSON, statusCodes.UNAUTHORIZED, errorCodes.DONT_PERMISSON);
  }

  req.user = userToken;
  next();
};

export const isAmdin = (req, res, next) => {
  if (req.user && req.user.role_id === ROLES.IS_ADMIN.id) {
    next();
  } else {
    throw new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, statusCodes.NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
      errorMessages.ROUTE_NOT_FOUND,
    ]);
  }
};
