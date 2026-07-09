const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({
            message: "Unable to register user."
        });
    }

    if (!isValid(username)) {
        return res.status(404).json({
            message: "User already exists!"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(200).json({
        message: "User successfully registered. Now you can login."
    });

});

// Task 10 - Get all books using Promise callbacks with Axios
public_users.get('/', function (req, res) {

    axios.get('http://localhost:5000/books')
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(error => {
            return res.status(500).json(error.message);
        });

});

// Internal endpoint
public_users.get('/books', function (req, res) {
    return res.status(200).json(books);
});

// Task 11 - Get book by ISBN using Async/Await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {

    try {

        const isbn = req.params.isbn;

        const response = await axios.get('http://localhost:5000/books');

        return res.status(200).json(response.data[isbn]);

    } catch (err) {

        return res.status(500).json(err.message);

    }

});

// Task 12 - Get books by Author using Async/Await with Axios
public_users.get('/author/:author', async function (req, res) {

    try {

        const author = req.params.author;

        const response = await axios.get('http://localhost:5000/books');

        const filteredBooks = Object.keys(response.data)
            .filter(isbn => response.data[isbn].author === author)
            .reduce((obj, key) => {
                obj[key] = response.data[key];
                return obj;
            }, {});

        return res.status(200).json(filteredBooks);

    } catch (err) {

        return res.status(500).json(err.message);

    }

});

// Task 13 - Get books by Title using Async/Await with Axios
public_users.get('/title/:title', async function (req, res) {

    try {

        const title = req.params.title;

        const response = await axios.get('http://localhost:5000/books');

        const filteredBooks = Object.keys(response.data)
            .filter(isbn => response.data[isbn].title === title)
            .reduce((obj, key) => {
                obj[key] = response.data[key];
                return obj;
            }, {});

        return res.status(200).json(filteredBooks);

    } catch (err) {

        return res.status(500).json(err.message);

    }

});

// Get book review
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn].reviews);

});

module.exports.general = public_users;
