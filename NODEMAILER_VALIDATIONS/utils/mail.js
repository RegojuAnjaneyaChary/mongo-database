nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailer_user,
        pass: process.env.pass
    }
});



async function sendMail(mailId) {

    const mailOptions = {
        from: process.env.nodemailer_user,
        to: mailId,
        subject: "test mail service",
        text: "test mail",
        html: `<div><h1>hello</h1></div>`
    }
    try {
        const mailsent = await transporter.sendMail(mailOptions);
        console.log("send mail func.....", mailsent);
        return "mail sent successfully";

    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { sendMail };