
# Shipping Request Delivery System

This repository hosts the **Shipping Request and Delivery System** project developed as part of a Distributed Systems and Cloud Computing college course. The project is designed using **Domain Driven Design (DDD)** to ensure a clean separation between the core business logic, infrastructure, and application layers.

## Features

- **Merchant Functionality**
    - **Registration & Login:** Merchants can securely register and log in.
    - **Request Delivery:** Merchants can create delivery requests by entering package details such as size, weight, and destination address.
- **Delivery Personnel Functionality:**
    - **View Assigned Deliveries:** Delivery personnel have access to view the deliveries assigned to them.
    - **Status Updates:** They can update the status of each delivery (e.g., transitioning from 'Picked up' to 'Delivered').


## Demo

Try the project Here
## Folder Structure Tree

```bash
distributed-systems-2025-shipping-request-delivery-system/
├── back-end/
│   └── src/
│       ├── application/          # Application Layer - orchestrates use cases
│       │   ├── dto               # Data Transfer Objects (DTOs)
│       │   ├── errors            # Application Services Errors
│       │   └── services          # Application Services (Use Cases)
│       ├── domain/               # Domain Layer - Core business logic
│       │   ├── entities          # Domain Entities
│       │   ├── enums             # Domain Enums
│       │   ├── interfaces        # Domain Interfaces
│       │   └── value-objects     # Domain Value Objects
│       ├── infrastructure/       # Infrastructure Layer - Database, External services
│       │   ├── database          # Database Connection
│       │   └── repositories      # Repository Implementaions
│       └── interfaces/           # Interface Layer - API controllers, Routes and Middlewares
│           ├── controllers       # API Controllers
│           └── http/             # Routes and Middlewares
│               ├── routes        # API Routes
│               └── middlewares   # API Middlewares
├── docs/                         # Application Documentation
│   └── diagrams                  # Application Diagrams
└── front-end/
    ├── public
    └── src/
        ├── app/                  # Application Routes
        │   ├── delivery          # Delivery Person's Dashboard
        │   │   └── my            # Delivery Person's Assigned Shipments
        │   └── merchant          # Merchant's Dashboard
        ├── components/           # Application UI Components
        │   └── ui                # Shadcn UI Components
        ├── context               # Main Application Context
        ├── lib                   # Application Utilities
        └── types                 # Application Types
```
## Tech Stack

**Client:** Next.js, React, TailwindCSS, Shadcn

**Server:** Node, Express, Mongodb


## API Reference

#### Postman Collection

Import our Postman collection to explore and test all available endpoints:

```bash
/docs/postman.json
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

`MONGODB_URI`

`DB_NAME`

`JWT_SECRET`

`JWT_EXPIRATION`

### Frontend

`NEXT_PUBLIC_API_URL`
## Run Locally

Follow these steps to get the project up and running on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Ahmed-M-Aboutaleb/distributed-systems-2025-shipping-request-delivery-system.git
cd distributed-systems-2025-shipping-request-delivery-system
```

### 2. Using Docker (Recommended)

Start all services with Docker Compose:
```bash
docker compose up -d
```

> Tip: To view logs, run `docker compose logs -f`.

### 3. Manual installation

Backend

```bash
  cd back-end
  npm install
  npm run dev
```

> The backend server should now be running at `http://localhost:9000` (or your configured port).

Frontend

```bash
  cd front-end
  npm install
  npm run dev
```

> The front server should now be running at `http://localhost:3000` (or your configured port).

You’re all set! 🚀

Feel free to tweak ports or environment variables in the respective `.env` files.
## License

[MIT](https://github.com/Ahmed-M-Aboutaleb/distributed-systems-2025-shipping-request-delivery-system/LICENSE)


## Authors

- [@Ahmed-M-Aboutaleb](https://www.github.com/ahmed-m-aboutaleb)

