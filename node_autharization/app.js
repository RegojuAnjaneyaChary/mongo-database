const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes.js")
const connectDatabase = require("./config/db.js");
const jwt = require("jsonwebtoken");





//  const user= {
//         userName: "chary20",
//         email: "user20@example.com",
//         bio: "heloo i am"
//     }

// const token = jwt.sign(user, "jfghjklwertyuioxcvbn", {
//   algorithm: "HS256",
//   expiresIn: "30m",
// });

// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImNoYXJ5MjAiLCJlbWFpbCI6InVzZXIyMEBleGFtcGxlLmNvbSIsImJpbyI6ImhlbG9vIGkgYW0iLCJpYXQiOjE3NTQwMjc3MTYsImV4cCI6MTc1NDAyOTUxNn0.9oBbwul7CJAJ2um7WrYC7oxlW3gAXmJuTmNB5FzenN0"
// console.log(token);
// console.log(jwt.verify(token, process.env.jwt_secret_key));








connectDatabase();
//middlewares
app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.send("hello i am server");
});

//route middleware
app.use("/auth", userRoutes);




app.listen(process.env.port || 3000, () => {
    console.log("application started " + process.env.port);
});
