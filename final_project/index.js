const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
 // Retrieve the token from the Authorization header
 const token = req.headers['authorization'];

 if (!token) {
     return res.status(403).send("Token required for authentication");
 }

 try {
     // Verify the token
     const decoded = jwt.verify(token, "fingerprint_customer"); // Replace with your secret key
     req.user = decoded; // Attach decoded user data to the request
     next(); // Proceed to the next middleware/route handler
 } catch (err) {
     res.status(401).send("Invalid token");
 }
});


 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
