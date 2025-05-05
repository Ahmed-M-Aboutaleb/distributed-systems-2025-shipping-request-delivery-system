import { ObjectId } from "mongodb";
import IAddress from "./IAddress";

interface IMerchant {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  companyName: string;
  phoneNumber: string;
  businessAddress: IAddress;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IMerchant;
