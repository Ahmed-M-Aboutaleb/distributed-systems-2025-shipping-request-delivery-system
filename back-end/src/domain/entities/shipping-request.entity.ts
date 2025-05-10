import { ObjectId } from "mongodb";
import ShipmentStatus from "../enums/shipment-status";

class ShippingRequest {
  private readonly _id: ObjectId;
  private _deliveryPersonId: ObjectId | null;
  private _merchantId: ObjectId | null;
  private _pickupLocation: string;
  private _dropoffLocation: string;
  private _pickupTime: Date;
  private _dropoffTime: Date;
  private _status: ShipmentStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: ObjectId | null,
    deliveryPersonId: ObjectId | null,
    merchantId: ObjectId | null,
    pickupLocation: string,
    dropoffLocation: string,
    pickupTime: Date,
    dropoffTime: Date,
    status: ShipmentStatus = ShipmentStatus.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id || new ObjectId();
    this._deliveryPersonId = deliveryPersonId;
    this._merchantId = merchantId;
    this._pickupLocation = pickupLocation;
    this._dropoffLocation = dropoffLocation;
    this._pickupTime = pickupTime;
    this._dropoffTime = dropoffTime;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): ObjectId {
    return this._id;
  }

  get deliveryPersonId(): ObjectId | null {
    return this._deliveryPersonId;
  }

  set deliveryPersonId(value: ObjectId | null) {
    this._deliveryPersonId = value;
  }

  get merchantId(): ObjectId | null {
    return this._merchantId;
  }

  set merchantId(value: ObjectId | null) {
    this._merchantId = value;
  }

  get pickupLocation(): string {
    return this._pickupLocation;
  }

  set pickupLocation(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Pickup location is required");
    }
    this._pickupLocation = value;
  }

  get dropoffLocation(): string {
    return this._dropoffLocation;
  }

  set dropoffLocation(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Dropoff location is required");
    }
    this._dropoffLocation = value;
  }

  get pickupTime(): Date {
    return this._pickupTime;
  }

  set pickupTime(value: Date) {
    if (!value) {
      throw new Error("Pickup time is required");
    }
    this._pickupTime = value;
  }

  get dropoffTime(): Date {
    return this._dropoffTime;
  }

  set dropoffTime(value: Date) {
    if (!value) {
      throw new Error("Dropoff time is required");
    }
    this._dropoffTime = value;
  }

  get status(): ShipmentStatus {
    return this._status;
  }

  set status(value: ShipmentStatus) {
    if (!(value in ShipmentStatus)) {
      throw new Error("Status must be a valid ShipmentStatus enum value");
    }
    this._status = value;
    this._updatedAt = new Date();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  toJSON() {
    return {
      id: this._id,
      deliveryPersonId: this._deliveryPersonId,
      merchantId: this._merchantId,
      pickupLocation: this._pickupLocation,
      dropoffLocation: this._dropoffLocation,
      pickupTime: this._pickupTime,
      dropoffTime: this._dropoffTime,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromDocument(json: any): ShippingRequest {
    return new ShippingRequest(
      json.id,
      json.deliveryPersonId,
      json.merchantId,
      json.pickupLocation,
      json.dropoffLocation,
      new Date(json.pickupTime),
      new Date(json.dropoffTime),
      json.status,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }
}

export default ShippingRequest;
