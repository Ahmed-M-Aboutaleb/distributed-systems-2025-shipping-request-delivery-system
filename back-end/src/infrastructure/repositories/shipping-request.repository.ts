import { Collection, Db, ObjectId } from "mongodb";
import ShippingRequest from "@domain/entities/shipping-request.entity";
import Address from "@domain/value-objects/Address";
import PackageDetails from "@domain/value-objects/PackageDetails";
import ShipmentStatus from "@domain/enums/shipment-status";
import GeneralError from "@/application/errors/general.error";

class ShippingRequestRepository {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("shippingRequests");
  }

  async findAll(): Promise<ShippingRequest[]> {
    const shippingRequestsData = await this.collection.find().toArray();
    return shippingRequestsData.map((data) => this.mapToEntity(data));
  }

  async findById(id: string | ObjectId): Promise<ShippingRequest | null> {
    const objectId = this.toObjectId(id);
    const shippingRequestData = await this.collection.findOne({
      _id: objectId,
    });
    return shippingRequestData ? this.mapToEntity(shippingRequestData) : null;
  }

  async create(shippingRequest: ShippingRequest): Promise<ShippingRequest> {
    const shippingRequestData = shippingRequest.toJSON();
    const result = await this.collection.insertOne(shippingRequestData);
    return this.findById(result.insertedId) as Promise<ShippingRequest>;
  }

  async update(shippingRequest: ShippingRequest): Promise<ShippingRequest> {
    const shippingRequestData = shippingRequest.toJSON();
    await this.collection.updateOne(
      { _id: shippingRequest.id },
      { $set: shippingRequestData },
      { upsert: true }
    );
    return this.findById(shippingRequest.id) as Promise<ShippingRequest>;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const objectId = this.toObjectId(id);
    const deleteResult = await this.collection.deleteOne({ _id: objectId });
    return deleteResult.acknowledged && deleteResult.deletedCount === 1;
  }

  async findByDeliveryPersonId(
    deliveryPersonId: string | ObjectId
  ): Promise<ShippingRequest[]> {
    const objectId = this.toObjectId(deliveryPersonId);
    const shippingRequestsData = await this.collection
      .find({ deliveryPersonId: objectId })
      .toArray();
    return shippingRequestsData.map((data) => this.mapToEntity(data));
  }

  async findByMerchantId(
    merchantId: string | ObjectId
  ): Promise<ShippingRequest[]> {
    const objectId = this.toObjectId(merchantId);
    const shippingRequestsData = await this.collection
      .find({ merchantId: objectId })
      .toArray();
    console.log("Shipping requests data:", shippingRequestsData);
    return shippingRequestsData.map((data) => this.mapToEntity(data));
  }

  async findByStatus(status: ShipmentStatus): Promise<ShippingRequest[]> {
    const shippingRequestsData = await this.collection
      .find({ status: status })
      .toArray();
    return shippingRequestsData.map((data) => this.mapToEntity(data));
  }

  private toObjectId(id: string | ObjectId): ObjectId {
    return typeof id === "string" ? new ObjectId(id) : id;
  }

  private mapToEntity(data: any): ShippingRequest {
    const pickupLocation = Address.fromDocument(data.pickupLocation);
    const dropoffLocation = Address.fromDocument(data.dropoffLocation);
    const packageDetails = PackageDetails.fromDocument(data.packageDetails);
    if (!pickupLocation || !dropoffLocation || !packageDetails) {
      throw new GeneralError("Invalid address or package details data");
    }
    if (!pickupLocation || !dropoffLocation) {
      throw new GeneralError("Invalid address data");
    }
    return ShippingRequest.fromDocument({
      ...data,
      pickupLocation,
      dropoffLocation,
      packageDetails,
    });
  }
}

export default ShippingRequestRepository;
