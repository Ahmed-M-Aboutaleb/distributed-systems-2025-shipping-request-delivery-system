import { ObjectId } from "mongodb";
import Address from "../value-objects/Address";
import ShipmentStatus from "../enums/shipment-status";
import PackageDetails from "@domain/value-objects/PackageDetails";

interface IShippingRequest {
  deliveryPersonId: ObjectId | null | string;
  merchantId: ObjectId | string;
  pickupLocation: Address;
  dropoffLocation: Address;
  pickupTime: Date;
  dropoffTime: Date;
  status: ShipmentStatus;
  PackageDetails: PackageDetails;
  createdAt: Date;
  updatedAt: Date;
}

export default IShippingRequest;
