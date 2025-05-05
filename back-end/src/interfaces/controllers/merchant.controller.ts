import MerchantRepository from "@infrastructure/repositories/merchant.repository";
import AuthService from "@application/services/auth.service";
import { Request, Response } from "express";
import EmailAlreadyExistsError from "@application/errors/email-already-exists.error";
import DatabaseServerError from "@application/errors/database-server.error";

class MerchantController {
  private authService: AuthService;
  private merchantRepository: MerchantRepository;
  constructor(
    authService: AuthService,
    merchantRepository: MerchantRepository
  ) {
    this.merchantRepository = merchantRepository;
    this.authService = authService;
  }

  async registerMerchant(req: Request, res: Response) {
    try {
      const merchantData = req.body;
      // TODO: Validate merchantData here using DTO
      const newMerchant = await this.authService.registerMerchant(merchantData);
      return res.status(201).json(newMerchant.toJSON());
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default MerchantController;
