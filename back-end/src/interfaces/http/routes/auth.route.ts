import AuthController from "@interfaces/controllers/auth.controller";
import { Router } from "express";
import validateDto from "../middlewares/validate-dto.middleware";
import { RegisterMerchantDto } from "@/application/dto/auth/register-merchant.dto";
import { LoginDto } from "@application/dto/auth/login.dto";
import { RegisterDeliveryPersonDto } from "@application/dto/auth/register-delivery-person.dto";

export function setupAuthRoutes(
  router: Router,
  authController: AuthController
): Router {
  router.post("/login", validateDto(LoginDto), async (req, res) => {
    await authController.login(req, res);
  });

  router.post(
    "/register-merchent",
    validateDto(RegisterMerchantDto),
    async (req, res) => {
      await authController.registerMerchant(req, res);
    }
  );

  router.post(
    "/register-delivery-person",
    validateDto(RegisterDeliveryPersonDto),
    async (req, res) => {
      await authController.registerDeliveryPerson(req, res);
    }
  );

  return router;
}
