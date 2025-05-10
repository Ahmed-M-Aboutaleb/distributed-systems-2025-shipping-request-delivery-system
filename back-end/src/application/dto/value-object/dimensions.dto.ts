import { IsNotEmpty, IsNumber } from "class-validator";

class DimensionsDto {
  @IsNotEmpty({ message: "Length is required" })
  @IsNumber()
  length!: number;
  @IsNotEmpty({ message: "Width is required" })
  @IsNumber()
  width!: number;
  @IsNotEmpty({ message: "Height is required" })
  @IsNumber()
  height!: number;
}

export default DimensionsDto;
