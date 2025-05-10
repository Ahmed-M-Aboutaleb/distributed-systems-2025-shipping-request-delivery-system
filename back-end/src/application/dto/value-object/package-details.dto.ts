import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
import DimensionsDto from "./dimensions.dto";
import { Type } from "class-transformer";

class PackageDetailsDto {
  @IsNotEmpty({ message: "Weight is required" })
  @IsNumber()
  weight!: number;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions!: DimensionsDto;
  @IsNotEmpty({ message: "Fragile value is required" })
  @IsBoolean()
  fragile!: boolean;
}

export default PackageDetailsDto;
