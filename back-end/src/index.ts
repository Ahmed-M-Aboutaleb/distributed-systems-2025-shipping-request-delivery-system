import "reflect-metadata";
import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDatabase from "@infrastructure/database/database";

// Routes
import { setupMerchantRoutes } from "@interfaces/http/routes/merchant.route";

// Controllers
import MerchantController from "@interfaces/controllers/merchant.controller";
import DeliveryPersonController from "@/interfaces/controllers/delivery-person.controller";
import AuthController from "@/interfaces/controllers/auth.controller";

// Services
import AuthService from "@application/services/auth.service";
import ShippingService from "@/application/services/shipping.service";

// Repositories
import MerchantRepository from "@infrastructure/repositories/merchant.repository";
import ShippingRequestRepository from "@/infrastructure/repositories/shipping-request.repository";
import DeliveryPersonRepository from "@/infrastructure/repositories/delivery-person.repository";
import { setupAuthRoutes } from "./interfaces/http/routes/auth.route";
import { setupDeliveryPersonRoutes } from "./interfaces/http/routes/delivery-person.route";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

async function initializeApp() {
  try {
    // Connect to MongoDB
    const mongoUri: string = process.env.MONGODB_URI || "";
    const dbName: string = process.env.DB_NAME || "shipping_db";

    const db = await connectDatabase(mongoUri, dbName);

    // Initialize repositories
    const merchantRepository = new MerchantRepository(db);
    const shippingRequestRepository = new ShippingRequestRepository(db);
    const deliveryPersonRepository = new DeliveryPersonRepository(db);

    // Initialize services
    const authService = new AuthService(
      merchantRepository,
      deliveryPersonRepository
    );
    const shippingService = new ShippingService(shippingRequestRepository);

    // Initialize controllers
    const merchantController = new MerchantController(shippingService);
    const deliveryPersonController = new DeliveryPersonController(
      shippingService
    );
    const authController = new AuthController(authService);

    // Setup routes
    const authRouter = express.Router();
    const deliveryPersonRouter = express.Router();
    const merchantRouter = express.Router();

    // Apply merchant routes to the router
    setupMerchantRoutes(merchantRouter, merchantController);
    setupAuthRoutes(authRouter, authController);
    setupDeliveryPersonRoutes(deliveryPersonRouter, deliveryPersonController);

    // Register the router with the app
    app.use("/api/v1/auth/", authRouter);
    app.use("/api/v1/merchants/", merchantRouter);
    app.use("/api/v1/delivery-persons/", deliveryPersonRouter);

    // Base route
    app.get("/", (req, res) => {
      res.send("Shipping Request and Delivery System API");
    });

    // Global error handler
    app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error(err.stack);
        res.status(500).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    );

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
}

// Start the application
initializeApp();
