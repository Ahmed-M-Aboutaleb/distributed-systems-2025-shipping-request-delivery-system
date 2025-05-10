import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import AddressDto from "../value-object/address.dto";
import PackageDetailsDto from "../value-object/package-details.dto";

class NewShippingRequestDto {
  @IsNotEmpty({ message: "Pickup Location is required" })
  @ValidateNested()
  @Type(() => AddressDto)
  pickupLocation!: AddressDto;
  @IsNotEmpty({ message: "Dropoff Location is required" })
  @ValidateNested()
  @Type(() => AddressDto)
  dropoffLocation!: AddressDto;
  @IsNotEmpty({ message: "Pickup Time is required" })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate({ message: "Invalid Pickup Time" })
  pickupTime!: Date;
  @IsNotEmpty({ message: "Dropoff Time is required" })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate({ message: "Invalid Dropoff Time" })
  dropoffTime!: Date;
  @IsNotEmpty({ message: "Package Details are required" })
  @ValidateNested()
  @Type(() => PackageDetailsDto)
  packageDetails!: PackageDetailsDto;
}

export default NewShippingRequestDto;
