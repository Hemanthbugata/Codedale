
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


## 📘 API Routes: Explanation with Parameters, Responses & Auth Requirements

---

### 🔐 Auth & User

#### 1. POST `/api/register` *(Public)*
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001",
    "country": "USA"
  }
}
```
- **Response:** User registered

#### 2. POST `/api/login` *(Public)*
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response:** JWT token + user info

#### 3. GET `/api/users` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Response:** List of all users

#### 4. GET `/api/users/:id` *(User/Admin Token Required)*
- **Header:** `Authorization: Bearer <token>`
- **Response:** User profile

#### 5. PUT `/api/users/:id` *(User/Admin Token Required)*
- **Header:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```
- **Response:** Updated user

#### 6. DELETE `/api/users/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Response:** Deletion message

#### 7. PUT `/api/users/:id/role` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{ "role": "admin" }
```

#### 8. GET `/api/users/:id/address` *(User/Admin Token Required)*
- **Header:** `Authorization: Bearer <token>`
- **Response:** Address data

---

### 🛍️ Product

#### 1. POST `/api/products` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Body:** Product details

#### 2. GET `/api/products` *(Public)*
- **Response:** List of products

#### 3. GET `/api/products/:id` *(Public)*
- **Response:** Single product

#### 4. PUT `/api/products/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Body:** Updated fields

#### 5. DELETE `/api/products/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

#### 6. GET `/api/products/category/:categoryId` *(Public)*

#### 7. GET `/api/products/brand/:brandName` *(Public)*

#### 8. PUT `/api/products/:id/stock` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Body:** `{ "stock": 30 }`

---

### 🧾 Category

#### 1. POST `/api/categories` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`
- **Body:** `{ "name": "Clothing" }`

#### 2. GET `/api/categories` *(Public)*

#### 3. GET `/api/categories/:id` *(Public)*

#### 4. PUT `/api/categories/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

#### 5. DELETE `/api/categories/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

---

### 🛒 Cart

#### 1. POST `/api/cart/add` *(User Token Required)*
- **Header:** `Authorization: Bearer <user-token>`
- **Body:** `{ "productId": "...", "quantity": 2 }`

#### 2. DELETE `/api/cart/remove/:productId` *(User Token Required)*
- **Header:** `Authorization: Bearer <user-token>`

#### 3. PUT `/api/cart/update/:productId` *(User Token Required)*
- **Header:** `Authorization: Bearer <user-token>`
- **Body:** `{ "quantity": 3 }`

#### 4. GET `/api/cart` *(User Token Required)*

#### 5. DELETE `/api/cart/clear` *(User Token Required)*

#### 6. PUT `/api/cart/total/:userId` *(Admin/User Token Required)*

---

### 📦 Order

#### 1. POST `/api/orders` *(User Token Required)*
- **Header:** `Authorization: Bearer <user-token>`

#### 2. GET `/api/orders` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

#### 3. GET `/api/orders/user/:userId` *(User/Admin Token Required)*

#### 4. GET `/api/orders/:orderId` *(User/Admin Token Required)*

#### 5. PUT `/api/orders/:orderId/status` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

#### 6. DELETE `/api/orders/:orderId` *(User/Admin Token Required)*

#### 7. PUT `/api/orders/:orderId/address` *(User/Admin Token Required)*

#### 8. GET `/api/orders/:orderId/track` *(User Token Required)*

---

### 💳 Payment

#### 1. POST `/api/payments` *(User Token Required)*
- **Header:** `Authorization: Bearer <user-token>`

#### 2. GET `/api/payments/:id` *(User/Admin Token Required)*

#### 3. GET `/api/payments/order/:orderId` *(User/Admin Token Required)*

#### 4. PUT `/api/payments/:id` *(Admin Token Required)*
- **Header:** `Authorization: Bearer <admin-token>`

#### 5. DELETE `/api/payments/:id` *(Admin Token Required)*

---

### 🌟 Review

#### 1. POST `/api/reviews` *(User Token Required)*

#### 2. GET `/api/reviews/product/:productId` *(Public)*

#### 3. GET `/api/reviews/user/:userId` *(User/Admin Token Required)*

#### 4. PUT `/api/reviews/:reviewId` *(User/Admin Token Required)*

#### 5. DELETE `/api/reviews/:reviewId` *(User/Admin Token Required)*

---

### 🔍 Search & Filters

#### 1. GET `/api/search?query=` *(Public)*

#### 2. GET `/api/products/sort/:type` *(Public)*

#### 3. GET `/api/products/low-stock` *(Admin Token Required)*

#### 4. GET `/api/stats/dashboard` *(Admin Token Required)*

#### 5. GET `/api/user/:id/purchase-history` *(User/Admin Token Required)*

