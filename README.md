# Blog Management Project
## Back-end Development

🛠️ Technology Use
   - TypeScript
   - Node.js
   - Express.js
   - MongoDB 
   - Mongoose

✅ Project setup
   - create express server
   - setup export & import
   - API testing with postman
   - Environment variable & .gitignore
   - create README.md file
   - Modules pattern in software architecture


✅ Database setup
   - connect to mongodb atlas database / local mongodb compass


✅ Auth API
- 🔖 Auth interface - model and schema with validations for auth api
    - create auth validation
    - create auth routes controller and service

 1. POST /api/auth/register ->  user register (D)
    - extract request body
    - check user existing
    - compare the password & return response
    - create jwt token with an expiry time   

1. POST /api/auth/login -> user login (D)
    - middlewares: auth
    - extract request body
    - check user existing
    - compare the password & return response
    - check user is banned & return response
    - create jwt token with an expiry time


✅ Blog API
 - 🔖 Blog interface - model and schema with validations for Blog
    - create Blog validation
    - create Blog routes and controller

1. POST /api/Blogs -> create the Blog (D)
    - get the data from request body
    - input validation check
    - check Blog existing
    - send response

2. GET /api/Blogs -> get all Blog including search (D)
    - get data from request query
    - search Blog using regex
    - send response    

3. GET /api/Blogs/:id -> get the single Blog (D)
    - get the id from request params
    - findById()
    - send response based on Blog found or not
    - handle the mongoose Cast error

4. DELETE /api/Blogs/:id -> delete the Blog (D)
    - get the id from request params
    - findById(id)
    - findByIdAndDelete(id)
    - send response based on Blog found or not
    - handle the mongoose Cast error

5. PUT /api/Blogs/:id -> update the Blog (D)
    - get the data from request body and params
    - create filter, updates, options
    - findByIdAndUpdate(filter, updates, options)
    - if Blog was updated then send response


✅ Admin Action API
 - 🔖 Blog interface - model and schema with validations for Blog
    - create Blog validation
    - create Blog routes and controller

1. POST /api/Blogs -> create the Blog (D)
    - get the data from request body
    - input validation check
    - check Blog existing
    - send response

2. GET /api/Blogs -> get all Blog including search (D)
    - get data from request query
    - search Blog using regex
    - send response    

3. GET /api/Blogs/:id -> get the single Blog (D)
    - get the id from request params
    - findById()
    - send response based on Blog found or not
    - handle the mongoose Cast error

4. DELETE /api/Blogs/:id -> delete the Blog (D)
    - get the id from request params
    - findById(id)
    - findByIdAndDelete(id)
    - send response based on Blog found or not
    - handle the mongoose Cast error

5. PUT /api/Blogs/:id -> update the Blog (D)
    - get the data from request body and params
    - create filter, updates, options
    - findByIdAndUpdate(filter, updates, options)
    - if Blog was updated then send response


✅ package that we will need
 - `npm install express cors dotenv mongoose validator http-errors`

 - `npm install --save-dev typescript ts-node-dev @eslint/js @types/cors @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier globals prettier typescript-eslint`