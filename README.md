
# Bitetoothpaste Backend API 🚀

Welcome to the Bitetoothpaste Backend API project! This project sets up a backend for Bitetoothpaste, an e-commerce platform, using MongoDB and Express.js. It includes features like user authentication, product management, order processing, and email notifications.

---
## Table of Contents 📋

- [Project Overview](#project-overview-rocket)
- [Project Structure](#project-structure-structure)
- [Developer Responsibilities](#developer-responsibilities-gear)
- [API Endpoints](#api-endpoints-endpoint)
- [Packages](#packages-package)
- [Database Schema](#database-schema-database)
- [Environment Variables](#environment-variables-gear)
- [How to Run the Project](#how-to-run-the-project-running)
- [Tools](#tools-wrench)

---

## Project Overview 🚀

This backend project is designed to support Bitetoothpaste with functionalities such as:

- **User Registration & Authentication**: Secure user registration and login with JWT.
- **Product Management**: CRUD operations for product listing.
- **Order Processing**: Creating and managing customer orders.
- **Email Notifications**: Automated emails for user registration and order confirmations.

---

## Project Structure 📂

```
/bitetoothpaste-backend
|-- /config
|   |-- db.js            # Database connection
|   |-- emailConfig.js    # Email service configuration
|
|-- /controllers
|   |-- authController.js    # Handles user authentication
|   |-- productController.js # Handles product-related fuctions
|   |-- orderController.js   # Handles order-related fuction
|   |-- cartController.js   # Handles cart-related functions
|   |-- reviewController.js   # Handles review-related fuction
|
|-- /models
|   |-- User.js      # User schema
|   |-- Product.js   # Product schema
|   |-- Order.js     # Order schema
|   |-- Cart.js      # Cart schema
|   |-- Review.js    # Review schema
|
|-- /routes
|   |-- authRoutes.js     # Routes for user authentication
|   |-- productRoutes.js  # Routes for product listing 
|   |-- orderRoutes.js    # Routes for orders
|   |-- cartRoutes.js     # Routes for cart
|   |-- reviewRoutes.js    # Routes for review
|
|-- /middleware
|   |-- authMiddleware.js  # JWT validation middleware
|
|-- /utils
|   |-- errorHandler.js    # Custom error handler
|   |-- emailService.js    # Email sending logic
|
|-- index.js         # Main entry point of the application
```

---

## Developer Responsibilities ⚙️

### Developer 1

1. **Design Database Schema: Users, Products, Review **
   - **Files**: `/models/User.js`, `/models/Product.js`
   - **Task**: Define Mongoose schemas for users, products, and reviews.

2. **User Authentication (Register, Login, JWT)**
   - **Files**: `/controllers/authController.js`, `/routes/authRoutes.js`, `/middleware/authMiddleware.js`,`/routes/productRoutes.js`
   - **Task**: Implement user registration, login, and JWT-based authentication.

3. **Email Setup: User Registration and Order Confirmation**
   - **Files**: `/config/emailConfig.js`, `/utils/emailService.js`, `/controllers/authController.js`, `/controllers/productController.js`
   - **Task**: Implement email notifications for users during registration and for order confirmations.

### Developer 2

1. **Set Up Database for Orders, Carts,category **
   - **Files**: `/models/Order.js`, `/models/Cart.js`,`/models/productCategory.js`
   - **Task**: Define the schema for orders and carts.

2. **Product Listing and Order Endpoints**
   - **Files**:, `/controllers/orderController.js`,`/controllers/cartController.js`,`/controllers/productCategoryController.js``/routes/orderRoutes.js`,`/routes/cart.js`,`/routes/productCategory.js`
   - **Task**: Create routes for product listing, product detail retrieval, creating orders, and managing carts.


---

## Packages 📦

The following packages are used in this project:

- **Express.js**: Web framework for Node.js
  ```bash
  npm install express
  ```
- **MongoDB & Mongoose**: MongoDB database and Mongoose ORM
  ```bash
  npm install mongoose
  ```
- **Nodemailer**: Email sending service
  ```bash
  npm install nodemailer
  ```
- **Bcrypt.js**: Password hashing library
  ```bash
  npm install bcryptjs
  ```
- **JWT (JSON Web Tokens)**: Authentication and securing routes
  ```bash
  npm install jsonwebtoken
  ```
- **Dotenv**: Environment variable management
  ```bash
  npm install dotenv
  ```
- **Joi**: Schema validation for request data
  ```bash
  npm install joi
  ```
- **Cors**: Handling CORS
  ```bash
  npm install cors
  ```
- **Multer** (Optional): File uploads
  ```bash
  npm install multer
  ```
- **Express-async-handler**: Simplify async route handlers
  ```bash
  npm install express-async-handler
  ```
- **Morgan** (Optional): HTTP request logger for development
  ```bash
  npm install morgan
  ```

For development:
```bash
npm install --save-dev nodemon
```

---

## Database Schema 🗃️

### User Schema
- **firstName**: String
- **lastName**: String
- **email**: String (unique)
- **password**: String
- **role**: String (default: 'user'; roles: user, admin)
- **cart**: Array of objects (each object includes `productId` and `quantity`)
- **reviews**: Array of objects (each object includes `productId`, `content`, and `rating`)

### Product Schema
- **name**: String
- **description**: String
- **price**: Number
- **stock**: Number
- **reviews**: Array of objects (each object includes `userId`, `content`, and `rating`)

### Order Schema
- **userId**: ObjectId (references User)
- **products**: Array of objects (each object includes `productId` and `quantity`)
- **totalPrice**: Number
- **status**: String (default: 'Pending'; other statuses: Delivered, Cancelled)

### Cart Schema
- **userId**: ObjectId (references User)
- **products**: Array of objects (each object includes `productId` and `quantity`)

---

## Environment Variables 🔑

Create a `.env` file at the root of your project and add the following keys:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
PORT=5000
```

---

## How to Run the Project 🚀

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Make sure your `.env` file is configured properly.

3. **Run the server**:
   ```bash
   npm start
   ```

4. **Access the API**:
   You can now access the API at `http://localhost:5000`.

---

## Tools 🛠️

- **Database**: MongoDB
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer (Gmail configuration)

---



This README file provides a comprehensive overview of the Bitetoothpaste backend project, including details about database fields and all necessary configurations.
