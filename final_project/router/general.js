const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here


  const { username, password } = req.body; // Extract username and password from the request body

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Both username and password are required" });
  }

  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // If username does not exist, register the new user
  users[username] = { password: password }; // Add the user with the provided username and password

  return res.status(201).json({ message: "User successfully registered" }); // Return a success message
});
  


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here


// Convert the books object to an array of books
const booksArray = Object.values(books);

// Return the books as a JSON response, formatted neatly with indentation
res.status(200).send(JSON.stringify(booksArray, null, 2));
});


 

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn; // Retrieve ISBN from the request parameters

  // Check if the ISBN exists in the books object
  const book = books[isbn];

  if (book) {
    // If the book is found, send it back in the response
    return res.status(200).json(book);
  } else {
    // If the book is not found, return an error message
    return res.status(404).json({ message: "Book not found" });
  }
});

 
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author.toLowerCase(); // Retrieve the author from the request parameters

  // Filter books that match the given author (case insensitive)
  const booksByAuthor = Object.values(books).filter(book => 
    book.author.toLowerCase() === author
  );

  if (booksByAuthor.length > 0) {
    // If books by the author are found, return them as a JSON response
    return res.status(200).json(booksByAuthor);
  } else {
    // If no books by the author are found, return a 404 message
    return res.status(404).json({ message: "No books found by this author" });
  }
});


  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title.toLowerCase(); // Extract title from the request parameters and convert to lowercase
  const result = [];

  // Iterate through the 'books' object to find matching titles
  for (let bookId in books) {
    if (books[bookId].title.toLowerCase().includes(title)) { // Check if the title includes the search query
      result.push(books[bookId]);
    }
  }

  // Check if any books were found
  if (result.length > 0) {
    return res.status(200).json(result); // Return the books found
  } else {
    return res.status(404).json({ message: "No books found with this title" }); // Return a not found message
  }
});

  


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn; // Extract the ISBN from the request parameters

  // Check if the book with the provided ISBN exists
  if (books[isbn]) {
    const reviews = books[isbn].reviews; // Get the reviews of the book

    // Check if there are any reviews
    if (Object.keys(reviews).length > 0) {
      return res.status(200).json(reviews); // Return the reviews for the book
    } else {
      return res.status(404).json({ message: "No reviews found for this book" }); // No reviews for the book
    }
  } else {
    return res.status(404).json({ message: "Book not found" }); // If book doesn't exist
  }
});
 

module.exports.general = public_users;
