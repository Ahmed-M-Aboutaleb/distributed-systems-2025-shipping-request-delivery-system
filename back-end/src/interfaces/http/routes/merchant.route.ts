import NewShippingRequestDto from "@application/dto/shipping-request/new-shipping-request.dto";
import MerchantController from "@interfaces/controllers/merchant.controller";
import validateDto from "@interfaces/http/middlewares/validate-dto.middleware";
import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { authorizeMerchant } from "../middlewares/authorize.middleware";

export function setupMerchantRoutes(
  router: Router,
  merchantController: MerchantController
): Router {
  router.use(authMiddleware);
  router.use(authorizeMerchant());
  router.post(
    "/new-shipment",
    validateDto(NewShippingRequestDto),
    async (req: Request, res: Response) => {
      await merchantController.newShippingRequest(req, res);
    }
  );

  router.get("/shipment-requests", async (req: Request, res: Response) => {
    await merchantController.getShippingRequests(req, res);
  });

  return router;
}
