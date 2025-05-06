import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

class AddressDto {
  @IsNotEmpty({ message: "Street is required" })
  @IsString({ message: "Street must be a string" })
  street!: string;

  @IsNotEmpty({ message: "City is required" })
  @IsString({ message: "City must be a string" })
  city!: string;

  @IsNotEmpty({ message: "State is required" })
  @IsString({ message: "State must be a string" })
  state!: string;

  @IsNotEmpty({ message: "Zip code is required" })
  @IsString({ message: "Zip code must be a string" })
  zipCode!: string;

  @IsNotEmpty({ message: "Country is required" })
  @IsString({ message: "Country must be a string" })
  country!: string;

  @IsOptional()
  @IsString({ message: "Apartment must be a string" })
  apartment?: string;
}

export default AddressDto;
