const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();
const BASE_URL = "http://localhost:5000";

// Register
public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Unable to register user." });
    }

    if (isValid(username)) {
        return res.status(404).json({ message: "User already exists!" });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(200).json({
        message: "User successfully registered. Now you can login"
    });
});

// Get all books
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});

// Get books by author
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].author === author)
        .reduce((obj, key) => {
            obj[key] = books[key];
            return obj;
        }, {});

    return res.status(200).json(filteredBooks);

});

// Get books by title
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].title === title)
        .reduce((obj, key) => {
            obj[key] = books[key];
            return obj;
        }, {});

    return res.status(200).json(filteredBooks);

});

// Get reviews
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn].reviews);

});

// ---------------------------------------------------------
// Task 10: Async/Await + Axios methods
// These call your own endpoints above, demonstrating
// non-blocking client calls against your RESTful service.
// ---------------------------------------------------------

async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error retrieving books:", error.message);
    }
}

async function getBooksByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error retrieving ISBN:", error.message);
    }
}

async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(author)}`
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error retrieving author:", error.message);
    }
}

async function getBooksByTitle(title) {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(title)}`
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error retrieving title:", error.message);
    }
}

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBooksByISBN = getBooksByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
