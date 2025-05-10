import { ObjectId } from "mongodb";
import VehicleType from "../enums/vehicle-type";

interface IDeliveryPerson {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  vehicleLicensePlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IDeliveryPerson;
