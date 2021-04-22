const express = require('express');

const mongoose = require('mongoose');
const cors = require("cors")
const http = require('http')

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen( () => {
    console.log('server listening on port 4000: http://localhost:4000');
})


