import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const app = express();

// Use JSON
app.use(express.json());

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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, payload) => {
        if (error) {
            res.sendStatus(401);
        } 

        console.log(payload);

        req.user = payload;
        next();
    });
}

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.username));
});

app.listen(5050, () => {
    console.log("Listening to Port: 5050");
});