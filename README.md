# plotline_billing_system
Submission Details:
Name:Abhinav Srikanth
Registration Number:RA2011003020345
College:SRM Institute of Science and Technology,Ramapuram,Chennai-600089
Department: CSE
Section: G
Semester: 7
Current CGPA:9.33

This Node.js server provides a RESTful API to manage billing operations for a company, including creating an account, managing a shopping cart, calculating taxes, and confirming orders. The server uses a PostgreSQL database to store the necessary information.

Prerequisites
Node.js and npm should be installed on your system.
PostgreSQL database should be set up and running.

Installation
Clone this repository.
Navigate to the project directory: cd plotline-billing-system
Install the required dependencies: npm install

Database Setup
Create a PostgreSQL database named billing_system.
Execute the SQL commands provided in plotlinesql.sql to create the required tables and populate them with sample data.

API Endpoints
POST /account/create: Create a new user account.

GET /products: Get information about all products.

GET /services: Get information about all services.

POST /cart/add: Add a product or service to the cart.

POST /cart/remove: Remove a product or service from the cart.

POST /cart/clear: Clear the cart.

GET /cart/total: Get the total bill for the items in the cart.

POST /cart/confirm: Confirm the order.

GET /admin/orders: (Good to have) Get all orders (admin only).

Postman Configuration:
Postman Link:
https://api.postman.com/collections/27129775-26aef8f7-3086-41d0-bdd7-4b76c9f76d0e?access_key=PMAT-01H8GP33CVRXY5NJTZWYQN1CAG or 
https://www.postman.com/universal-spaceship-502564/workspace/billing-system/collection/27129775-26aef8f7-3086-41d0-bdd7-4b76c9f76d0e?action=share&creator=27129775
Make sure to run app.js file before sending a postman request.
You can now use the requests to interact with the API.

Email Reply:
I have added a screenshot of Email for order confirmation, you can try it out with your email too for your reference in the Order Confirmation Route.

Conclusion
This Node.js server provides the essential functionality for managing billing operations. Make sure to configure the database connection, follow the API documentation in the Postman collection, and simulate practical scenarios for testing.

Thank you for considering my work. If you need any further information, please feel free to reach me out.
Personal MailID:abhinavrikanth01@gmail.com
College MailID:as5441@srmist.edu.in
Contact No:6382636373
