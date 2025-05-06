import MerchantController from "@interfaces/controllers/merchant.controller";
import { RegisterMerchantDto } from "@application/dto/merchant/register-merchant.dto";
import validateDto from "@interfaces/http/middlewares/validate-dto.middleware";
import { Request, Response, Router } from "express";

export function setupMerchantRoutes(
  router: Router,
  merchantController: MerchantController
): Router {
  router.post(
    "/merchants/register",
    validateDto(RegisterMerchantDto),
    async (req: Request, res: Response) => {
      await merchantController.registerMerchant(req, res);
    }
  );

  return router;
}
