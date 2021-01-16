const express = require('express');
const path = require('path');
const hbs = require('hbs');
const Users = require('./Users');

const logger = require('./middleWare/logger');


const app = express();

// Set handlebar


// to set the views engine

app.set('view engine', 'hbs');
app.get("/", (req, res) => {
    res.render('index', {
        name: "test",
        Users
    });
});


// app.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>My web</h1>');
// });


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



//  Use / Set static folder for frontend ui

app.use(express.static(path.join(__dirname, 'public')));

//  Body parser MiddleWare

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// home page
app.get('/', (req, res) => {
        res.render('index')
    })
    // api routes
app.use('/api/users/', require('./routes/api/users'));

//  init middleware custom
// app.use(logger);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on ${PORT}, http://localhost:${PORT}`));