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