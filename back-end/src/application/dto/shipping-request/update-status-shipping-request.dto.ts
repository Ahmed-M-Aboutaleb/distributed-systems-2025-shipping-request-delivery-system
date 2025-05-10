import ShipmentStatus from "@/domain/enums/shipment-status";
import { IsEnum, IsNotEmpty } from "class-validator";

class UpdateStatusShippingRequestDto {
  @IsNotEmpty({ message: "orderId is required" })
  @IsEnum(ShipmentStatus)
  status!: ShipmentStatus;
}

export default UpdateStatusShippingRequestDto;
