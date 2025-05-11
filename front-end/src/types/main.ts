export enum VehicleType {
  CAR = "car",
  TRUCK = "truck",
  MOTORCYCLE = "motorcycle",
  BICYCLE = "bicycle",
}
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  apartment?: string;
}

interface Merchant {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  businessAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

interface DeliveryPerson {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  vehicleLicensePlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export type User = Merchant | DeliveryPerson;

export interface AppState {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export interface IShipmentRequestResponse {
  _id: string;
  pickupLocation: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dropoffLocation: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  pickupTime: string;
  dropoffTime: string;
  status: string;
  packageDetails: {
    weight: number;
    dimensions: {
      width: number;
      length: number;
      height: number;
    };
    fragile: boolean;
  };
}
