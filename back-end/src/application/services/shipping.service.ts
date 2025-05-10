import ShipmentStatus from "@domain/enums/shipment-status";
import ShippingRequest from "@domain/entities/shipping-request.entity";
import ShippingRequestRepository from "@infrastructure/repositories/shipping-request.repository";
import IShippingRequest from "@domain/interfaces/IShippingRequest";
import { ObjectId } from "mongodb";
import GeneralError from "../errors/general.error";

class ShippingService {
  constructor(private readonly shippingRepository: ShippingRequestRepository) {}

  async getShippingDetails(orderId: string): Promise<ShippingRequest> {
    const shippingDetails = await this.shippingRepository.findById(orderId);
    if (!shippingDetails) {
      throw new GeneralError("Shipping details not found");
    }
    return shippingDetails;
  }

  async updateShippingStatus(
    orderId: string,
    status: ShipmentStatus,
    deliveryPersonId?: string | ObjectId
  ): Promise<ShippingRequest> {
    const shippingDetails = await this.shippingRepository.findById(orderId);
    if (!shippingDetails) {
      throw new GeneralError("Shipping details not found");
    }
    shippingDetails.status = status;
    if (deliveryPersonId) {
      shippingDetails.deliveryPersonId = this.toObjectId(deliveryPersonId);
    }
    if (shippingDetails.deliveryPersonId != deliveryPersonId)
      throw new GeneralError("Delivery person ID does not match");
    const updated = await this.shippingRepository.update(shippingDetails);
    if (!updated) {
      throw new GeneralError("Failed to update shipping status");
    }
    return updated;
  }

  async getShippingRequestsByDeliveryPersonId(
    deliveryPersonId: string
  ): Promise<ShippingRequest[]> {
    const shippingRequests =
      await this.shippingRepository.findByDeliveryPersonId(deliveryPersonId);
    if (!shippingRequests) {
      throw new GeneralError(
        "No shipping requests found for this delivery person"
      );
    }
    return shippingRequests;
  }

  async getShippingRequestsByMerchantId(
    merchantId: string
  ): Promise<ShippingRequest[]> {
    const shippingRequests = await this.shippingRepository.findByMerchantId(
      merchantId
    );
    if (!shippingRequests) {
      throw new GeneralError("No shipping requests found for this merchant");
    }
    return shippingRequests;
  }

  async getShippingRequestsByStatus(
    status: ShipmentStatus
  ): Promise<ShippingRequest[]> {
    const shippingRequests = await this.shippingRepository.findByStatus(status);
    if (!shippingRequests) {
      throw new GeneralError("No shipping requests found with this status");
    }
    return shippingRequests;
  }

  async createShippingRequest(
    shippingRequest: IShippingRequest,
    merchantId: string
  ): Promise<ShippingRequest> {
    shippingRequest.merchantId = merchantId;
    shippingRequest.status = ShipmentStatus.PENDING;
    shippingRequest.deliveryPersonId = null;

    const newShippingRequest = await this.shippingRepository.create(
      ShippingRequest.fromDocument(shippingRequest)
    );
    if (!newShippingRequest) {
      throw new GeneralError("Failed to create shipping request");
    }
    return newShippingRequest;
  }

  async deleteShippingRequest(orderId: string): Promise<boolean> {
    const deleted = await this.shippingRepository.delete(orderId);
    if (!deleted) {
      throw new GeneralError("Failed to delete shipping request");
    }
    return deleted;
  }

  async updateShippingRequest(
    orderId: string,
    shippingRequest: ShippingRequest
  ): Promise<ShippingRequest> {
    const existingShippingRequest = await this.shippingRepository.findById(
      orderId
    );
    if (!existingShippingRequest) {
      throw new GeneralError("Shipping request not found");
    }
    const updatedShippingRequest = await this.shippingRepository.update(
      shippingRequest
    );
    if (!updatedShippingRequest) {
      throw new GeneralError("Failed to update shipping request");
    }
    return updatedShippingRequest;
  }
  private toObjectId(id: string | ObjectId): ObjectId {
    return typeof id === "string" ? new ObjectId(id) : id;
  }
}

export default ShippingService;
