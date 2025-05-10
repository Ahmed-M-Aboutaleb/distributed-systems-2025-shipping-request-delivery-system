import InvalidCredentialsError from "@application/errors/invalid-credentials.error";
import DatabaseServerError from "@application/errors/database-server.error";
import EmailAlreadyExistsError from "@application/errors/email-already-exists.error";
import AuthService from "@application/services/auth.service";
import { Request, Response } from "express";
import GeneralError from "@/application/errors/general.error";

class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async registerMerchant(req: Request, res: Response) {
    try {
      const merchantData = req.body;
      req.body.passwordHash = req.body.password;
      const newMerchant = await this.authService.registerMerchant(merchantData);
      return res.status(201).json(newMerchant);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async registerDeliveryPerson(req: Request, res: Response) {
    try {
      const deliveryPersonData = req.body;
      req.body.passwordHash = req.body.password;
      const newDeliveryPerson = await this.authService.registerDeliveryPerson(
        deliveryPersonData
      );
      return res.status(201).json(newDeliveryPerson);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof DatabaseServerError) {
        return res.status(500).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData = req.body;
      const loginResponse = await this.authService.login(loginData);
      return res.status(200).json(loginResponse);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).json({ message: error.message });
      } else if (error instanceof GeneralError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default AuthController;
