
# 🛍️ Codedale Ecommerce Backend

An Express.js-based ecommerce backend for user authentication, product management, cart, order processing, payment, and admin analytics.

---

## 🚀 Quick Start

### 📦 Clone the repository

```bash
git clone https://github.com/Hemanthbugata/Codedale.git
cd Codedale/ecommerence-backend
```

### 📥 Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root of the `ecommerence-backend` folder:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
```

---

## 🛣️ Available API Routes

### 🔐 Auth & User

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/register` | Register a new user |
| POST   | `/api/login` | User login |
| GET    | `/api/users` | Get all users *(admin only)* |
| GET    | `/api/users/:id` | Get user profile |
| PUT    | `/api/users/:id` | Update user details |
| DELETE | `/api/users/:id` | Delete user *(admin only)* |
| PUT    | `/api/users/:id/role` | Change user role *(admin only)* |
| GET    | `/api/users/:id/address` | Get user address info |

---

### 🛍️ Product

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/products` | Add a new product *(admin only)* |
| GET    | `/api/products` | Get all products |
| GET    | `/api/products/:id` | Get product by ID |
| PUT    | `/api/products/:id` | Edit product details *(admin only)* |
| DELETE | `/api/products/:id` | Delete product *(admin only)* |
| GET    | `/api/products/category/:categoryId` | Get products by category |
| GET    | `/api/products/brand/:brandName` | Get products by brand |
| PUT    | `/api/products/:id/stock` | Update product stock *(admin only)* |

---

### 🧾 Category

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/categories` | Create category |
| GET    | `/api/categories` | Get all categories |
| GET    | `/api/categories/:id` | Get a specific category |
| PUT    | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

---

### 🛒 Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/cart/add` | Add item to cart |
| DELETE | `/api/cart/remove/:productId` | Remove item from cart |
| PUT    | `/api/cart/update/:productId` | Update cart item quantity |
| GET    | `/api/cart` | Get cart contents |
| DELETE | `/api/cart/clear` | Clear entire cart |
| PUT    | `/api/cart/total/:userId` | Manually update cart total |

---

### 📦 Order

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/orders` | Place an order |
| GET    | `/api/orders` | Get all orders *(admin only)* |
| GET    | `/api/orders/user/:userId` | User order history |
| GET    | `/api/orders/:orderId` | Get order by ID |
| PUT    | `/api/orders/:orderId/status` | Update order status |
| DELETE | `/api/orders/:orderId` | Cancel order |
| PUT    | `/api/orders/:orderId/address` | Update shipping address |
| GET    | `/api/orders/:orderId/track` | Track order |

---

### 💳 Payment

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/payments` | Initiate payment |
| GET    | `/api/payments/:id` | Get payment info |
| GET    | `/api/payments/order/:orderId` | Payment by order ID |
| PUT    | `/api/payments/:id` | Update payment status *(admin only)* |
| DELETE | `/api/payments/:id` | Delete payment entry |

---

### 🌟 Review

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/reviews` | Add a review |
| GET    | `/api/reviews/product/:productId` | Get reviews for a product |
| GET    | `/api/reviews/user/:userId` | Get reviews by a user |
| PUT    | `/api/reviews/:reviewId` | Edit a review |
| DELETE | `/api/reviews/:reviewId` | Delete a review |

---

### 🔍 Search & Filters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/search?query=` | Search products by keyword |
| GET    | `/api/products/sort/:type` | Sort products (e.g. price, rating) |
| GET    | `/api/products/low-stock` | List low stock items *(admin only)* |
| GET    | `/api/stats/dashboard` | Admin dashboard analytics |
| GET    | `/api/user/:id/purchase-history` | Get purchase history of a user |

---
