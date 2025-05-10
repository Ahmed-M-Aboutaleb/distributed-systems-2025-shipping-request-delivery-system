import { NextFunction, Request, Response } from "express";
import { UserType } from "@domain/enums/user-types.enum";

const authorizeMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message:
          "Access denied. You don't have permission to access this resource.",
      });
      return;
    }

    next();
  };
};

export const authorizeMerchant = () => authorizeMiddleware([UserType.MERCHANT]);
export const authorizeDeliveryPerson = () =>
  authorizeMiddleware([UserType.DELIVERY_PERSON]);
export const authorizeAll = () =>
  authorizeMiddleware([UserType.MERCHANT, UserType.DELIVERY_PERSON]);

export default authorizeMiddleware;
