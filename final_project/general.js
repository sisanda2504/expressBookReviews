const axios = require("axios");

const BASE_URL = "http://localhost:5000";

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


module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle
};