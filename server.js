const express = require('express');
const fs = require('fs');
const path = require ('path');
const PORT = process.env.PORT || 3001;

const app = express();

let jsonNotes = require('./db/db.json');

// GET HTML routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    console.log("NOTES!");
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// PORT listen
app.listen(PORT, () => {
    console.log(`now listening on port:  ${PORT}!`);
});