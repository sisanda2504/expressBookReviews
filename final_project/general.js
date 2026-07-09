const axios = require("axios");

const BASE_URL = "http://localhost:5000";


async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);

        if (response.status === 200) {
            return response.data;
        }

        return "Unable to retrieve books";

    } catch (error) {
        return error.response
            ? error.response.data
            : error.message;
    }
}


async function getBooksByISBN(isbn) {
    try {
        const response = await axios.get(
            `${BASE_URL}/isbn/${isbn}`
        );

        if (response.status === 200 && response.data) {
            return response.data;
        }

        return "Book not found";

    } catch (error) {
        return error.response
            ? error.response.data
            : error.message;
    }
}


async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(author)}`
        );

        if (
            response.status === 200 &&
            Object.keys(response.data).length > 0
        ) {
            return response.data;
        }

        return "No books found for author";

    } catch (error) {
        return error.response
            ? error.response.data
            : error.message;
    }
}


async function getBooksByTitle(title) {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(title)}`
        );

        if (
            response.status === 200 &&
            Object.keys(response.data).length > 0
        ) {
            return response.data;
        }

        return "No books found for title";

    } catch (error) {
        return error.response
            ? error.response.data
            : error.message;
    }
}


module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle
};
