import Merchant from "@domain/entities/merchant.entity";
import IMerchant from "@domain/interfaces/IMerchant";
import MerchantRepository from "@infrastructure/repositories/merchant.repository";
import bcrypt from "bcrypt";
import EmailAlreadyExistsError from "../errors/email-already-exists.error";
import DatabaseServerError from "../errors/database-server.error";
import Address from "@domain/value-objects/Address";
class AuthService {
  constructor(private merchantRepository: MerchantRepository) {}

  async registerMerchant(merchantData: IMerchant) {
    await this.validateEmailAvailability(merchantData.email);
    const passwordHash = await this.hashPassword(
      merchantData.passwordHash as string
    );
    merchantData.passwordHash = passwordHash;
    const businessAddress = Address.fromDocumant(merchantData.businessAddress);
    merchantData.businessAddress = businessAddress;
    const newMerchant = await this.merchantRepository.create(
      Merchant.fromDocument(merchantData)
    );
    if (!newMerchant) {
      throw new DatabaseServerError();
    }
    return newMerchant;
  }
  private async validateEmailAvailability(email: string): Promise<void> {
    const existingMerchant = await this.merchantRepository.findByEmail(email);
    if (existingMerchant) {
      throw new EmailAlreadyExistsError();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default AuthService;
