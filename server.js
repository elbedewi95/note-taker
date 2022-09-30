const express = require('express');
const fs = require('fs');
const path = require ('path');
const PORT = process.env.PORT || 3001;

const app = express();

let jsonNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(jsonNotes.slice(1));
});

// GET HTML routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    console.log("NOTES!");
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});




//Function createNote
function createNote(body, noteArr) {
    const newNote = body;
    console.log(newNote);
    console.log(noteArr);
    
    if (noteArr.length === 0)
        noteArr.push(0);

    body.id = noteArr[0];
    noteArr[0]++;

    noteArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArr, null, 2)
    );
    return newNote;
}

//POST  '/api/notes'
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, jsonNotes);
    res.json(newNote);
});

// PORT listen
app.listen(PORT, () => {
    console.log(`now listening on port:  ${PORT}!`);
});