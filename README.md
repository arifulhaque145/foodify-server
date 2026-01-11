# 🍔 Foodify - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

**Foodify** is a professional-grade backend API for a multi-vendor food delivery platform. It features robust authentication, role-based access control, secure payments, and a dedicated dashboard for restaurant owners.

---

## 🚀 Key Features

-   **🔐 Secure Authentication**: JWT-based authentication with `httpOnly` cookies.
-   **🎭 Role-Based Access Control (RBAC)**: Distinct permissions for **Users**, **Restaurant Owners**, and **Admins**.
-   **💳 Payment Integration**: Secure transaction processing via **Stripe**.
-   **👨‍🍳 Owner Dashboard**: Real-time stats (Revenue, Orders, Food count) and order management for restaurant owners.
-   **🖼️ Image Uploads**: Multi-part form data support for food images using **Multer**.
-   **🛒 Advanced Cart & Orders**: Persistent cart management and automated order status tracking.
-   **⭐ Review System**: Verified user feedback and ratings.

---

## 🛠️ Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js (v5.x)
-   **Database:** MongoDB (Native Driver)
-   **Security:** JWT, Bcrypt, Cookie-Parser
-   **Payments:** Stripe API
-   **File Handling:** Multer
-   **Deployment:** Optimized for Vercel

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_URI=your_mongodb_connection_string
DB_NAME=foodify
ACCESS_TOKEN_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

---

## 🛣️ API Endpoints

### 🔑 Authentication & Users
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - Login & set auth cookie
- `POST /api/v1/logout` - Clear auth cookie
- `GET /api/v1/users` - List all users (**Admin Only**)
- `PATCH /api/v1/users/:id/make-admin` - Promote user (**Admin Only**)

### 🍔 Food Items
- `GET /api/v1/food-items` - Public catalog
- `POST /api/v1/food-items` - Add food with image (**Owner/Admin Only**)
- `PATCH /api/v1/food-items/:id` - Update details (**Owner/Admin Only**)
- `DELETE /api/v1/food-items/:id` - Remove item (**Owner/Admin Only**)

### 👨‍💻 Restaurant Owner (Dashboard)
- `GET /api/v1/owner/stats` - Personal revenue & sales stats
- `GET /api/v1/owner/orders` - Filtered orders for specific owner
- `PATCH /api/v1/owner/order-status/:orderId` - Update order lifecycle

### 💳 Payments
- `POST /api/v1/create-payment-intent` - Initialize Stripe payment
- `POST /api/v1/payments` - Save transaction & confirm order
- `GET /api/v1/payments` - User payment history

### 🛒 Cart & Orders
- `GET /api/v1/cart` - User specific cart items
- `POST /api/v1/orders` - Place new order

---

## 📂 Architecture

```text
src/
├── config/         # MongoDB Client & DB connection
├── controllers/    # Request/Response logic
├── middlewares/    # JWT Auth, Role Verification, Error Handling
├── routes/         # Endpoint definitions
├── services/       # Database queries & Business logic
├── utils/          # Multer config & Helpers
└── index.js        # Server entry point
```

---

## 🛠️ Installation

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/your-username/foodify-server.git
    npm install
    ```
2.  **Run Development:**
    ```bash
    npm run dev
    ```

