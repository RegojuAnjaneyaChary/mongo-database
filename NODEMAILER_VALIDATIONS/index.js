const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()
nodemailer = require("nodemailer");
const {sendMail} = require("./utils/mail.js")
const {emailValidation}= require("./validators/userValidation.js")
//middleware
app.use(express.urlencoded());
app.use(express.json())



app.post("/sendmail", emailValidation, async (req, res) => {
    try {
        const { email } = req.body;
        const { search } = req.query;

        const result = await sendMail(email)
        console.log(result)
        res.json({ message: "mail sent successfully", emailId: email, keyword: search });
   } catch (error) {
       console.log(error);
       res.status(400).send("something went wrong")
   }
})



app.listen(process.env.port, () => {
    console.log("server running ", process.env.port)
})