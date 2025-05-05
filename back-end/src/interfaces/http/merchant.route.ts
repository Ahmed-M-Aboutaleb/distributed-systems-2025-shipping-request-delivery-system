import express from "express";
import MerchantController from "../controllers/merchant.controller";

export function setupMerchantRoutes(
  router: express.Router,
  merchantController: MerchantController
): express.Router {
  // Auth routes - no authentication required
  router.post("/merchants/register", async (req, res) => {
    await merchantController.registerMerchant(req, res);
  });

  return router;
}
