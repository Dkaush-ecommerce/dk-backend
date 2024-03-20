const { StatusCodes } = require("http-status-codes");
const ApiError = require("../errors/ApiError");

const authRole = (...roles) => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new UnAutharise('JWT token not present');
    }
    const userRole = req.userRole;
    let havePermission = false;
    roles.forEach((role) => {
      if (userRole === role) {
        havePermission = true;
      }
    });
    if (!havePermission) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized to access this route!');
    }
    next();
  };
};

module.exports = authRole;
