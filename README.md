# [Bulkart - Bulk Purchasing App](https://bulkart.herokuapp.com)

eCommerce platform built with the MERN stack & Redux.\
[Check it out!](https://bulkart.herokuapp.com)

![Screenshot](/frontend/public/Screenshot.png)

## Usage

### ES Modules in Node

I have used ECMAScript Modules in the backend. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = any random text
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

You can use the following commands to seed the database with some sample users and products (`/backend/data`) as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Vendor)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## Use Cases

### 1. User Management

There are two types of users - Vendors and Customers. Each of them have their own use-cases.

### 1.1. Login Page

It has an option to enter the username and password, and then login. There is also an option to register in case the user does not have an existing account.

#### 1.2. Registration Page

During registration, there would be the option to select between customer and vendor type. Here the user enters his name, email address, and account password.

### 2. Vendor Use Cases

#### 2.1. Create New Product

Create a new product specifying its Name, Price, Image, and the Quantity in the Bundle.

#### 2.2. View all the listed products by him

He/she can view all the current product listing done by him/her.

- The vendor has the option to take down a listing making sure that customers get their product status as canceled.
- Once the product is ready to dispatch (i.e. when it has been ordered by sufficient people), it is removed from this view and becomes ready to dispatch.

#### 2.3. View all orders ready to dispatch

The vendor can see all the orders which are ready to be dispatched and he/she can click a button to dispatch the product which removes it from this view.

#### 2.4. View all dispatched orders

All dispatched orders are visible in another view.

### 3. Customer Use Cases

#### 3.1. Search for Product

- Exact string is done
- All the vendors selling that product are displayed along with their price, rating, reviews and quantity remaining

#### 3.2. Order Product

- Select the product
- Specify quantity desired
- Add it to cart
- Proceed to checkout
- Enter shipping address
- Place order
- Click to pay

#### 3.3. View Order Status

All orders are visible on user's profile to the user. All the products under a particular order have a dispatch status alongside them:
- Waiting,P laced, Dispatched, Cancelled
  - Waiting (If not enough orders have been placed meeting the minimum bulk quantity requirement by the seller)
    - Quantity left for the order to get placed is also shown
  - Placed (If the quantity requirements are met but is yet to get dispatched by the seller in his/her portal)
  - Dispatched (If the seller accepts the order in his/her portal)
  - Cancelled (If the seller cancels the order in his/her portal)

## FRONTEND

### COMPONENTS

- Home
- Login
- Register
- Product List
- Product Details
- Cart
- Profile
- Waiting List Products
- Ready to Dispatch Products
- Dispatched Products
- Shipping Details
- Place Order Screen
- Product Edit Screen
- Order Details

## BACKEND

### MODEL DESCRIPTION

#### USER

| NAME     | TYPE    | REQUIRED | OTHERS                       |
| -------- | ------  | -------- | ---------------------------- |
| name     | String  | true     | -                            |
| password | String  | true     | -                            |
| email    | String  | true     | unique: true                 |
| isVendor | Boolean | true     | default: false               |

#### PRODUCT

| NAME               | TYPE        | REQUIRED | OTHERS                                 |
| ------------------ | ------      | -------- | -------------------------------------- |
| user(the vendor)   | ObjectId    | true     | ref: User                              |
| name               | String      | true     |                                        |
| status             | String      | true     | default: 'Waiting'                     |
| image              | String      | true     |                                        |
| reviews            | Subdocument |          |                                        |
| rating             | Number      | true     | default: 0                             |
| numReviews         | Number      | true     | default: 0                             |
| price              | Number      | true     | default: 0                             |
| bundleQuantity     | Number      | true     | default: 0                             |
| remainingQuantity  | Number      | true     | -                                      |

### REVIEWS
| NAME               | TYPE        | REQUIRED | OTHERS                                 |
| ------------------ | ------      | -------- | -------------------------------------- |
| name               | String      | true     |                                        |
| rating             | String      | true     |                                        |
| comment            | String      | true     |                                        |
| user               | ObjectId    | true     | ref: User                              |

#### ORDER

| NAME              | TYPE         | REQUIRED | OTHERS          |
| --------          | ------       | -------- | ------          |
| user              | ObjectId     |   true   | ref: User       |
| orderItems        | Subdocument  |          |    -            |
| shippingAddress   | Subdocument  |          |    -            |
| paymentResult     | String       |     -    |    -            |
| totalPrice        | Number       |   true   | default: 0.0    |
| taxPrice          | Number       |   true   | default: 0.0    |
| shippingPrice     | Number       |   true   | default: 0.0    |
| isPaid            | Boolean      |   true   | default: false  |
| shippingPrice     | Date         |     -    |     -           |

#### ORDER ITEMS

| NAME              | TYPE         | REQUIRED | OTHERS          |
| --------          | ------       | -------- | ------          |
| name              | String       |   true   |    -            |
| image             | String       |   true   |    -            |
| price             | Number       |   true   |    -            |
| product           | ObjectId     |   true   |  Ref: Product   |

### SHIPPING ADDRESS

| NAME             | TYPE         | REQUIRED | OTHERS          |
| --------         | ------       | -------- | ------          |
| address          | String       |   true   |    -            |
| city             | String       |   true   |    -            |
| postalCode       | String       |   true   |    -            |
| country          | String       |   true   |    -            |

### API ROUTES

#### USERS

| API_ROUTE          | TYPE | DESCRIPTION                        |
| ------------------ | ---- | ---------------------------------- |
| /api/users/login   | POST | Auth user & get token              |
| /api/users         | POST | Register a new user                |
| /api/users/profile | GET  | Get user profile                   |
| /api/users/profile | PUT  | Update user profile                |

#### PRODUCTS

| API_ROUTE                         | TYPE   | DESCRIPTION                                    |
| ----------------------------      | ------ | -----------------------------------------------|
| /api/products                     | GET    | Fetch all products                             |
| /api/products/:id                 | GET    | Fetch single product                           |
| /api/products/:id                 | DELETE | Delist a product                               |
| /api/products                     | POST   | Create a product                               |
| /api/products/:id                 | PUT    | Update a product                               |
| /api/products/:id/reviews         | POST   | Create new review                              |
| /api/products/mywaitingproducts   | GET    | Get logged in vendor's waitlist products       |
| /api/products/dispatchready       | GET    | Get logged in vendor's dispatch ready products |
| /api/products/dispatched          | GET    | Get logged in vendor's dispatched products     |
| /api/products/dispatchProduct/:id | PUT    | Update product status to dispatched            |

#### ORDERS

| API_ROUTE                  | TYPE   | DESCRIPTION                     |
| -------------------------- | ------ | ------------------------------- |
| /api/orders                | POST   | Create new order                |
| /api/orders/:id            | GET    | Get order by ID                 |
| /api/orders/:id/pay        | PUT    | Update order to paid            |
| /api/orders/myorders       | GET    | Get logged in user orders       |