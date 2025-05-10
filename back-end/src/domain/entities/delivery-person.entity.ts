import { ObjectId } from "mongodb";
import VehicleType from "../enums/vehicle-type";
import IDeliveryPerson from "../interfaces/IDeliveryPerson";

class DeliveryPerson {
  private readonly _id: ObjectId;
  private _name: string;
  private _email: string;
  private _passwordHash: string;
  private _phoneNumber: string;
  private _vehicleType: VehicleType;
  private _vehicleLicensePlate: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: ObjectId | null,
    name: string,
    email: string,
    passwordHash: string,
    phoneNumber: string,
    vehicleType: VehicleType,
    vehicleLicensePlate: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id || new ObjectId();
    if (!name || name.trim().length === 0) throw new Error("Name is required");
    if (!email || email.trim().length === 0)
      throw new Error("Email is required");
    if (!passwordHash || passwordHash.trim().length === 0)
      throw new Error("Password hash is required");
    if (!phoneNumber || phoneNumber.trim().length === 0)
      throw new Error("Phone number is required");
    if (!vehicleType) throw new Error("Vehicle type is required");
    if (!vehicleLicensePlate || vehicleLicensePlate.trim().length === 0)
      throw new Error("Vehicle license plate is required");
    if (vehicleType === null || vehicleType === undefined)
      throw new Error("Vehicle type is required");

    this._id = id || new ObjectId();
    this._name = name;
    this._email = email;
    this._passwordHash = passwordHash;
    this._phoneNumber = phoneNumber;
    this._vehicleType = vehicleType;
    this._vehicleLicensePlate = vehicleLicensePlate;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): ObjectId {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get passwordHash(): string {
    return this._passwordHash;
  }
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  get vehicleType(): VehicleType {
    return this._vehicleType;
  }
  get vehicleLicensePlate(): string {
    return this._vehicleLicensePlate;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  set name(name: string) {
    if (!name || name.trim().length === 0) throw new Error("Name is required");
    this._name = name;
    this._updatedAt = new Date();
  }
  set email(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0)
      throw new Error("Email is required");
    if (!emailRegex.test(email)) throw new Error("Email is not valid");
    this._email = email;
    this._updatedAt = new Date();
  }

  set passwordHash(passwordHash: string) {
    if (!passwordHash || passwordHash.trim().length === 0)
      throw new Error("Password hash is required");
    this._passwordHash = passwordHash;
    this._updatedAt = new Date();
  }

  set phoneNumber(phoneNumber: string) {
    if (!phoneNumber || phoneNumber.trim().length === 0)
      throw new Error("Phone number is required");
    this._phoneNumber = phoneNumber;
    this._updatedAt = new Date();
  }

  set vehicleType(vehicleType: VehicleType) {
    if (!vehicleType) throw new Error("Vehicle type is required");
    if (!(vehicleType in VehicleType))
      throw new Error("Vehicle type must be a valid VehicleType enum value");
    this._vehicleType = vehicleType;
    this._updatedAt = new Date();
  }

  set vehicleLicensePlate(vehicleLicensePlate: string) {
    if (!vehicleLicensePlate || vehicleLicensePlate.trim().length === 0)
      throw new Error("Vehicle license plate is required");
    this._vehicleLicensePlate = vehicleLicensePlate;
    this._updatedAt = new Date();
  }

  set createdAt(createdAt: Date) {
    if (!(createdAt instanceof Date))
      throw new Error("Created at must be a Date");
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date) {
    if (!(updatedAt instanceof Date))
      throw new Error("Updated at must be a Date");
    this._updatedAt = updatedAt;
  }

  toJSON(): IDeliveryPerson {
    return {
      _id: this._id,
      name: this._name,
      email: this._email,
      passwordHash: this._passwordHash,
      phoneNumber: this._phoneNumber,
      vehicleType: this._vehicleType,
      vehicleLicensePlate: this._vehicleLicensePlate,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromDocument(doc: any): DeliveryPerson {
    return new DeliveryPerson(
      doc._id,
      doc.name,
      doc.email,
      doc.passwordHash,
      doc.phoneNumber,
      doc.vehicleType,
      doc.vehicleLicensePlate,
      doc.createdAt,
      doc.updatedAt
    );
  }
}

export default DeliveryPerson;
