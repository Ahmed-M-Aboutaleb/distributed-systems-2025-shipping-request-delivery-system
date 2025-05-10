import Merchant from "@domain/entities/merchant.entity";
import IMerchant from "@domain/interfaces/IMerchant";
import MerchantRepository from "@infrastructure/repositories/merchant.repository";
import bcrypt from "bcrypt";
import EmailAlreadyExistsError from "../errors/email-already-exists.error";
import DatabaseServerError from "../errors/database-server.error";
import Address from "@domain/value-objects/Address";
import IDeliveryPerson from "@domain/interfaces/IDeliveryPerson";
import DeliveryPersonRepository from "@infrastructure/repositories/delivery-person.repository";
import DeliveryPerson from "@domain/entities/delivery-person.entity";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import InvalidCredentialsError from "../errors/invalid-credentials.error";
import { UserType } from "@domain/enums/user-types.enum";

interface ILoginRequest {
  email: string;
  password: string;
  role: UserType;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

interface ILoginResponse {
  token: string;
  user: IMerchant | IDeliveryPerson;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

class AuthService {
  jwtSecret: Secret = process.env.JWT_SECRET || "your_jwt_secret";
  tokenExpiration: string = process.env.TOKEN_EXPIRATION || "1h";
  constructor(
    private merchantRepository: MerchantRepository,
    private deliveryPersonRepository: DeliveryPersonRepository
  ) {}

  async registerMerchant(merchantData: IMerchant): Promise<ILoginResponse> {
    await this.validateEmailAvailability(merchantData.email, UserType.MERCHANT);

    const passwordHash = await this.hashPassword(
      merchantData.passwordHash as string
    );
    const plainPassword = merchantData.passwordHash as string;
    merchantData.passwordHash = passwordHash;
    const businessAddress = Address.fromDocument(merchantData.businessAddress);
    merchantData.businessAddress = businessAddress;
    const newMerchant = await this.merchantRepository.create(
      Merchant.fromDocument(merchantData)
    );
    if (!newMerchant) {
      throw new DatabaseServerError();
    }
    return this.login({
      email: merchantData.email,
      password: plainPassword,
      role: UserType.MERCHANT,
    });
  }

  async registerDeliveryPerson(
    deliveryPersonData: IDeliveryPerson
  ): Promise<ILoginResponse> {
    await this.validateEmailAvailability(
      deliveryPersonData.email,
      UserType.DELIVERY_PERSON
    );
    const passwordHash = await this.hashPassword(
      deliveryPersonData.passwordHash as string
    );
    const plainPassword = deliveryPersonData.passwordHash as string;
    deliveryPersonData.passwordHash = passwordHash;
    const newDeliveryPerson = await this.deliveryPersonRepository.create(
      DeliveryPerson.fromDocument(deliveryPersonData)
    );
    if (!newDeliveryPerson) {
      throw new DatabaseServerError();
    }
    return this.login({
      email: deliveryPersonData.email,
      password: plainPassword,
      role: UserType.DELIVERY_PERSON,
    });
  }

  async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    let user: Merchant | DeliveryPerson | null = null;
    if (loginRequest.role === UserType.MERCHANT) {
      user = await this.merchantRepository.findByEmail(loginRequest.email);
    } else {
      user = await this.deliveryPersonRepository.findByEmail(
        loginRequest.email
      );
    }

    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isPasswordValid = await this.verifyPassword(
      loginRequest.password,
      user.passwordHash as string
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = this.generateToken(user);
    const userData = user.toJSON();
    delete userData.passwordHash;
    const userWithoutPassword: IMerchant | IDeliveryPerson = {
      ...userData,
    };
    return { token, user: userWithoutPassword };
  }

  private generateToken(user: Merchant | DeliveryPerson): string {
    const payload: JwtPayload = {
      id: user.id.toString(),
      email: user.email,
      role: "",
    };
    if (user instanceof Merchant) {
      payload.role = UserType.MERCHANT;
    } else if (user instanceof DeliveryPerson) {
      payload.role = UserType.DELIVERY_PERSON;
    }
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.tokenExpiration,
    } as SignOptions);
  }

  private async validateEmailAvailability(
    email: string,
    userType: UserType
  ): Promise<void> {
    if (userType === UserType.MERCHANT) {
      const existingMerchant = await this.merchantRepository.findByEmail(email);
      if (existingMerchant) {
        throw new EmailAlreadyExistsError();
      }
    } else {
      const existingDeliveryPerson =
        await this.deliveryPersonRepository.findByEmail(email);
      if (existingDeliveryPerson) {
        throw new EmailAlreadyExistsError();
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}

export default AuthService;
