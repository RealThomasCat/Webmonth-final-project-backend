require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const client = require("./configs/db");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req,res) => {
    res.status(200).send("Server is up and running!");
});

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);

client.connect(() => {
    console.log("Connected to database!")
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
