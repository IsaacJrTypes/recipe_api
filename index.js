import express from 'express';
//import { APICredentials } from './apiCred';
//const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);

app.get("/", (req, res) => {
    res.type('text/plain');
    res.send("recipe page");
});

// Query grocery API
app.get('/recipe', (req, res) => {
    const userQuery = req.query;

    let jsonResponse ;

    // Verify query property
    if (userQuery.hasOwnProperty('query')) {
        console.log(userQuery);


        
    } else {
        jsonResponse = { 'success': false }
        res.status(406).type('json').send(jsonResponse)
    }

    res.type('text/plain');
    res.send("Query recipe page");
    console.log(userQuery);
});

app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send('404 error');
});


app.listen(app.get('port'), () => {
    console.log(`Express running at ${port}`);
    console.log(`In browser go to: http://localhost:${port}`);
});