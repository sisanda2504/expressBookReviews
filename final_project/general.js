const axios = require("axios");

// Task 11 - Get all books
async function getAllBooks() {
    try {
        const response = await axios.get("http://localhost:5000/");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11 - Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11 - Get books by Author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(
            `http://localhost:5000/author/${encodeURIComponent(author)}`
        );
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11 - Get books by Title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(
            `http://localhost:5000/title/${encodeURIComponent(title)}`
        );
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Example calls
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Chinua Achebe");
getBooksByTitle("Things Fall Apart");