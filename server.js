import express from "express";
import dotenv from "dotenv";

const app = express();

const posts = [
    {
        username: "Adam",
        title: "Post 1",
    },
    {
        username: "Eve",
        title: "Post 1"
    }
]

app.get("/posts", (req, res) => {
    
});

app.listen(5050, () => {
    console.log("Listening to Port: 5050");
});