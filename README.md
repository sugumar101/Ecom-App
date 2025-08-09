# Deployment Instructions

## Prerequisites
- Node.js 18 or higher
- npm
- AWS account (EC2, Elastic Beanstalk, or ECS recommended)
- (Optional) RDS or managed database for production

## Environment Variables
Copy `.env.example` to `.env` and set your production secrets and DB config.

## Install dependencies
```sh
npm install
```

## Build & Start
```sh
npm run start
```

## Deployment Steps
1. Push your code to a GitHub repo or upload to AWS.
2. Launch an EC2 instance or use Elastic Beanstalk for managed deployment.
3. Set environment variables in AWS console or via `.env` file.
4. Install Node.js and dependencies on the server.
5. Run `npm start` to launch the app.
6. (Optional) Use PM2 or a process manager for reliability.

## Notes
- For production, use PostgreSQL or RDS instead of SQLite.
- Set a strong `JWT_SECRET` in your environment.
- Open port 3000 (or your chosen port) in your AWS security group.

---
# E-commerce Backend Application

This is the backend for an e-commerce application built using Express.js. The application provides RESTful APIs for managing products and handling user interactions.

## Project Structure

```
ecom-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains route handlers
│   │   └── index.js
│   ├── models                # Defines data models
│   │   └── index.js
│   ├── routes                # Sets up application routes
│   │   └── index.js
│   ├── middlewares           # Middleware functions
│   │   └── index.js
│   └── utils                 # Utility functions
│       └── index.js
├── package.json              # NPM configuration file
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd ecom-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

The server will start on the specified port (default is 3000). You can then access the API endpoints as defined in the routes.


## TechStack:

## Backend:
   - Framework- Express.js
   - DB: PostgreSQL with Sequelize
   - Authentication: JWT
   - validation: Express-validator
   - Logger: Winston
    -  Documentation: Swagger
   - File Storage: S3
   - Cloud: AWS

## Modules:
   - User
   - Products

## API Endpoints
```
  1.  Users:
      1. Post: /signup
      2. Post: /signin
      3. Post: /forgot-password
      4. Post: /verify-user
      5. Update: /update-profile
      6. Get: /view-profile?id=1

   2. Products:
      1. Get: /roducts?name="xyz"  (get all products and also filtered products)
      2. Get: /product/id (get product by id)
      3. Update: /product?id=1 (update product by business user)
      4. post: /addtocart
      5. delete: /deletefromcart
      6. post: /checkout  (redirect it to thirdparty API)
```
## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.








