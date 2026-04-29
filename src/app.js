const express = require('express')

const app = express();

app.use("/profile", (req, res) => {
    res.send("Hello Shivam!")
})

app.use("/", (req, res) => {
    res.send("Welcome Home!")
})

app.listen(7777, () => {
    console.log("Server successfully listening on 7777...")
})