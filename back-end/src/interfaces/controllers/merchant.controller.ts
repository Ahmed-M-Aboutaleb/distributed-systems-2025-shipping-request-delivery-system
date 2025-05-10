import { Request, Response } from "express";
import DatabaseServerError from "@application/errors/database-server.error";
import ShippingService from "@application/services/shipping.service";
import IShippingRequest from "@/domain/interfaces/IShippingRequest";
import GeneralError from "@/application/errors/general.error";

class MerchantController {
  private shippingService: ShippingService;
  constructor(shippingService: ShippingService) {
    this.shippingService = shippingService;
  }

  async newShippingRequest(req: Request, res: Response) {
    try {
      const shippingRequestData: IShippingRequest = req.body;
      const merchantId = req.user?.id;
      const newShippingRequest =
        await this.shippingService.createShippingRequest(
          shippingRequestData,
          merchantId as string
        );
      return res.status(201).json(newShippingRequest.toJSON());
    } catch (error) {
      if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getShippingRequests(req: Request, res: Response) {
    try {
      const merchantId = req.user?.id;
      const shippingRequests =
        await this.shippingService.getShippingRequestsByMerchantId(
          merchantId as string
        );

      return res
        .status(200)
        .json(shippingRequests.map((request) => request.toJSON()));
    } catch (error) {
      if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default MerchantController;
