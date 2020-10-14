const express = require("express");
const welcomeRouter = require('../routers/welcomeRouter');
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(welcomeRouter)

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        errorMessage: 'Something went wrong server-side'
    })
})

module.exports = server;
