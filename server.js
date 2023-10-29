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
        // Dodajte druge korisničke podatke prema potrebi
    };
    const secret = "tajnaTajnaTajna"; // Vaša tajna
    const options = { expiresIn: "24h" }; // Token ističe nakon 24 sata

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

app.use(cors());
app.use(express.json());

app.post("/api/signup", async (req, res) => {
    const { username, password, email } = req.body;

    // Provera da li korisnik sa istim korisničkim imenom već postoji
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Korisničko ime već postoji" });
    }

    // Kreiranje novog korisnika
    const newUser = new UserModel({ username, password, email });

    try {
        await newUser.save();
        res.status(200).json({ message: "Registracija uspešna" });
    } catch (error) {
        res.status(500).json({ message: "Greška prilikom registracije" });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username, password });
    if (user) {
        const token = generateToken(user);
        res.status(200).json({ message: "Uspešna prijava", token });
    } else {
        res.status(401).json({ message: "Netačno korisničko ime ili lozinka" });
    }
});

app.get("/api/check-login", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Niste prijavljeni" });
    }

    jwt.verify(token, "tajnaTajnaTajna", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Niste prijavljeni" });
        }

        res.status(200).json({ message: "Prijavljeni ste" });
    });
});

app.get("/", (req, res) => {
    res.send("Dobrodošli na moj server!");
});

app.listen(port, () => {
    console.log(`Server radi na portu ${port}`);
});
