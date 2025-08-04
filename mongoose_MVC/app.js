const express = require("express");
const app = express();
const todoRoutes = require('./routes/todoRoute.js'); 
const {connectDB}=require('./config/db.js')

connectDB();
// middleware
app.use(express.json());
app.use(express.urlencoded());

//apis
app.get("/", (req, res) => {
    res.status(200).send("hi iam good")
});

app.use("/api/todos", todoRoutes);

app.listen(4000, (req, res) => {
    console.log("server running in port 4000");
});

