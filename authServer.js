import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const app = express();

// Use JSON
app.use(express.json());

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { username: username };

    // Returns JWT_ACCESS_TOKEN
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5s' });
}

app.listen(5052, () => {
    console.log("Listening to Port: 5052");
});