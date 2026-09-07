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

    refreshTokens.push(refreshToken);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15s' });
}

// ---------------------------------------------------------------------------

let refreshTokens = [];

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null) {
        // Invalid/Missing Credentials
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(refreshToken)) {
        // Forbidden
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }

        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: accessToken });
    })
})

app.listen(5052, () => {
    console.log("Listening to Port: 5052");
});