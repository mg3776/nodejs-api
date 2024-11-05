// Import the Express library
const express = require('express');

// Create an Express application instance
const app = express();

// Define a port for the server to listen on
const PORT = 3000;

// Sample data: array of book objects
const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
];

// Define a GET endpoint for '/books' to return the books array as JSON
app.get('/books', (req, res) => {
    res.json(books); // Send the books array as a JSON response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
