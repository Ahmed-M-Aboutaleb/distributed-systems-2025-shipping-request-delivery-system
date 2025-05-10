import validateDto from "@interfaces/http/middlewares/validate-dto.middleware";
import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import DeliveryPersonController from "@interfaces/controllers/delivery-person.controller";
import UpdateStatusShippingRequestDto from "@/application/dto/shipping-request/update-status-shipping-request.dto";
import { authorizeDeliveryPerson } from "../middlewares/authorize.middleware";

export function setupDeliveryPersonRoutes(
  router: Router,
  deliveryPersonController: DeliveryPersonController
): Router {
  router.use(authMiddleware);
  router.use(authorizeDeliveryPerson());
  router.get(
    "/available-shipment-requests",
    async (req: Request, res: Response) => {
      await deliveryPersonController.getAvailableShippingRequests(req, res);
    }
  );
  router.post(
    "/accept-shipment/:orderId",
    async (req: Request, res: Response) => {
      await deliveryPersonController.acceptShippingRequest(req, res);
    }
  );
  router.get("/my-shipment-requests", async (req: Request, res: Response) => {
    await deliveryPersonController.getMyShippingRequests(req, res);
  });
  router.put(
    "/shipment-requests/:orderId",
    validateDto(UpdateStatusShippingRequestDto),
    async (req: Request, res: Response) => {
      await deliveryPersonController.updateShippingStatus(req, res);
    }
  );
  router.get(
    "/shipment-requests/:orderId",
    async (req: Request, res: Response) => {
      await deliveryPersonController.getShippingRequestById(req, res);
    }
  );
  return router;
}
