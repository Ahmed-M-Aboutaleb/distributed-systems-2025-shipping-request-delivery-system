import { UserType } from "@/domain/enums/user-types.enum";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail()
  email!: string;
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(UserType)
  role!: UserType;
}
