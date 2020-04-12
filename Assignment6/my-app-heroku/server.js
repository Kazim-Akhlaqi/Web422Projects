const express = require("express");
const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("Public"));

app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "/Public/index.html"));
});

app.listen(HTTP_PORT, ()=>{
    console.log(`Server is running on port number: ${HTTP_PORT}`);
});