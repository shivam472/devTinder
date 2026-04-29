const express = require('express')

const app = express();

app.get("/user", (req, res) => {
    res.send("Hello Shivam!")
})

app.post("/user", (req, res) => {
    res.send("Successfully save user to the DB")
})

app.patch("/user", (req, res) => {
    res.send("Successfully updated the user in the DB")
})

app.put("/user", (req, res) => {
    res.send("Successfully overridden the user in the DB")
})

app.delete("/user", (req, res) => {
    res.send("Successfully deleted the user from the DB")
})
app.get("/", (req, res) => {
    res.send("Welcome Home!")
})

app.listen(7777, () => {
    console.log("Server successfully listening on 7777...")
})