import ShipmentStatus from "@domain/enums/shipment-status";
import ShippingService from "@application/services/shipping.service";
import { Request, Response } from "express";
import DatabaseServerError from "@/application/errors/database-server.error";
import GeneralError from "@/application/errors/general.error";

class DeliveryPersonController {
  private shippingService: ShippingService;
  constructor(shippingService: ShippingService) {
    this.shippingService = shippingService;
  }

  async getAvailableShippingRequests(req: Request, res: Response) {
    try {
      const shippingRequests =
        await this.shippingService.getShippingRequestsByStatus(
          ShipmentStatus.PENDING
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
        console.error("Error fetching available shipping requests:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async acceptShippingRequest(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        throw new GeneralError("Order ID is required");
      }
      const deliveryPersonId = req.user?.id;
      if (!orderId || !deliveryPersonId) {
        return res.status(400).json({ message: "Invalid request" });
      }
      const shippingRequest = await this.shippingService.getShippingDetails(
        orderId
      );
      if (!shippingRequest) {
        return res.status(404).json({ message: "Shipping request not found" });
      }
      if (shippingRequest.status !== ShipmentStatus.PENDING) {
        return res
          .status(400)
          .json({ message: "Shipping request is not available" });
      }
      const updatedShippingRequest =
        await this.shippingService.updateShippingStatus(
          orderId,
          ShipmentStatus.ASSIGNED,
          deliveryPersonId as string
        );
      return res.status(200).json(updatedShippingRequest.toJSON());
    } catch (error) {
      if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Error accepting shipping request:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getMyShippingRequests(req: Request, res: Response) {
    try {
      const deliveryPersonId = req.user?.id;
      const shippingRequests =
        await this.shippingService.getShippingRequestsByDeliveryPersonId(
          deliveryPersonId as string
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
        console.error("Error fetching shipping requests:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async updateShippingStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      if (!orderId || orderId === "") {
        throw new GeneralError("Order ID is required");
      }
      console.log("Order ID:", orderId);
      const { status } = req.body;
      const deliveryPersonId = req.user?.id;
      const updatedShippingRequest =
        await this.shippingService.updateShippingStatus(
          orderId,
          status,
          deliveryPersonId as string
        );
      return res.status(200).json(updatedShippingRequest.toJSON());
    } catch (error) {
      if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Error updating shipping status:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getShippingRequestById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      if (!orderId || orderId === "") {
        throw new GeneralError("Order ID is required");
      }
      const shippingRequest = await this.shippingService.getShippingDetails(
        orderId
      );
      if (!shippingRequest) {
        return res.status(404).json({ message: "Shipping request not found" });
      }
      return res.status(200).json(shippingRequest.toJSON());
    } catch (error) {
      if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Error fetching shipping request:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default DeliveryPersonController;
