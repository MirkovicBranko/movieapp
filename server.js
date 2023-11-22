const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

function generateToken(user) {
    const payload = {
        userId: user._id,

    };
    const secret = "tajnaTajnaTajna"; // My secret token
    const options = { expiresIn: "24h" }; // Token expires in 24 hours

    return jwt.sign(payload, secret, options);
}

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB database");
});

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;

app.use(cors({
    origin: '*', //  Allowing requests only from this domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enables sending cookies between domains if needed
}));

app.use(express.json());

app.post("/api/signup", async (req, res) => {
    const { username, password, email } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username allready exists" });
    }

    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Username is not in the right format" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password is not in the right format" });
    }

    //creating new user
    const newUser = new UserModel({ username, password, email });

    try {
        await newUser.save();
        res.status(200).json({ message: "Registration successfull" });
    } catch (error) {
        res.status(500).json({ message: "Error during registration" });
    }
});
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (user) {
        const token = generateToken(user);
        res.status(200).json({ message: "Login successfull", token });
    } else {
        res.status(401).json({ message: "Wrong email or password" });
    }
});

app.get("/api/check-login", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "You're not logged in!" });
    }

    jwt.verify(token, "tajnaTajnaTajna", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "You're not logged in!" });
        }

        res.status(200).json({ message: "You're logged in!" });
    });
});
app.post("/api/send-message", (req, res) => {
    const { name, email, message } = req.body;
    res.status(200).json({ message: "Message sent" });
});

app.get("/", (req, res) => {
    res.send("Welcome to my server!");
});

app.listen(port, () => {
    console.log(`Server works on port: ${port}`);
});