const axios = require("axios");

const url = "http://localhost:5000";


async function getAllBooks() {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    }
    catch(error) {
        console.log(error.message);
    }
}


async function getBooksByISBN(isbn) {
    try {
        let response = await axios.get(`${url}/isbn/${isbn}`);
        console.log(response.data);
    }
    catch(error) {
        console.log(error.message);
    }
}


async function getBooksByAuthor(author) {
    try {
        let response = await axios.get(
            `${url}/author/${author}`
        );

        console.log(response.data);
    }
    catch(error) {
        console.log(error.message);
    }
}


async function getBooksByTitle(title) {
    try {
        let response = await axios.get(
            `${url}/title/${title}`
        );

        console.log(response.data);
    }
    catch(error) {
        console.log(error.message);
    }
}


getAllBooks();
getBooksByISBN(1);
getBooksByAuthor("Chinua Achebe");
getBooksByTitle("Things Fall Apart");


module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle
};
