import VehicleType from "@/domain/enums/vehicle-type";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class RegisterDeliveryPersonDto {
  @IsNotEmpty({ message: "Name is required" })
  name!: string;
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail()
  email!: string;
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
  @IsNotEmpty({ message: "Phone number is required" })
  phoneNumber!: string;
  @IsNotEmpty({ message: "Vehicle type is required" })
  @IsEnum(VehicleType)
  vehicleType!: VehicleType;
  @IsNotEmpty({ message: "Vehicle license plate is required" })
  vehicleLicensePlate!: string;
}
