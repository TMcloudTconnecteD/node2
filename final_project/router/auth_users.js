const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

return users.some(user => user.username === username);
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const { username } = req.session;  // Retrieve the username from the session
  const { review } = req.query;  // Get the review from the query parameters
  const isbn = req.params.isbn;  // Get the ISBN from the URL parameter

  // Check if the user is logged in
  if (!username) {
    return res.status(401).json({ message: "User not logged in!" });
  }

  // Validate if the review is provided
  if (!review) {
    return res.status(400).json({ message: "Review cannot be empty!" });
  }

  // Check if the book exists in the database
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found!" });
  }

  // Check if the review for this book already exists for the current user
  if (books[isbn].reviews[username]) {
    // Modify the existing review
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review updated successfully!" });
  } else {
    // Add a new review for the book
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added successfully!" });
  }
});

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
