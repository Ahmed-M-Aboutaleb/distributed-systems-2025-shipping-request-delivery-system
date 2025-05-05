import Merchant from "@domain/entities/merchant.entity";
import IMerchant from "@domain/interfaces/IMerchant";
import MerchantRepository from "@infrastructure/repositories/merchant.repository";
import bcrypt from "bcrypt";

class AuthService {
  constructor(private merchantRepository: MerchantRepository) {}

  async registerMerchant(merchantData: IMerchant) {
    const existingMerchant = await this.merchantRepository.findByEmail(
      merchantData.email
    );
    if (existingMerchant) {
      throw new Error("Merchant already exists with this email.");
    }
    const passwordHash = await this.hashPassword(
      merchantData.passwordHash as string
    );
    merchantData.passwordHash = passwordHash;
    const newMerchant = await this.merchantRepository.create(
      Merchant.fromDocument(merchantData)
    );
    if (!newMerchant) {
      throw new Error("Failed to create merchant.");
    }
    return newMerchant;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
