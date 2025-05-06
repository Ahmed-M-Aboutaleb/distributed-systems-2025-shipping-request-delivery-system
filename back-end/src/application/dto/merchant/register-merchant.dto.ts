import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import AddressDto from "../value-object/address.dto";

export class RegisterMerchantDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password!: string;

  @IsNotEmpty({ message: "Company name is required" })
  @IsString({ message: "Company name must be a string" })
  companyName!: string;

  @IsNotEmpty({ message: "Phone number is required" })
  @IsString({ message: "Phone number must be a string" })
  phoneNumber!: string;

  @IsNotEmpty({ message: "Business address is required" })
  @ValidateNested()
  @Type(() => AddressDto)
  businessAddress!: AddressDto;
}
