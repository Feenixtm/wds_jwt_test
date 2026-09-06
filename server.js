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

app.get("/posts", authenticateToken, (req, res) => {
    res.json({ accessToken: posts.filter(post => post.username === req.user.name), user: req.user });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { username: username };

    // Returns JWT_ACCESS_TOKEN
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);

    res.json({ accessToken: accessToken });
});

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

        req.user = payload;
        next();
    });
}

app.listen(5050, () => {
    console.log("Listening to Port: 5050");
});