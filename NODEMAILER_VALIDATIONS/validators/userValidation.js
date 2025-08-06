const { body, query, validationResult } = require("express-validator");

const emailValidation = [
    query("search").trim().notEmpty().isLength(3).withMessage("search is required"),
    body("email").isEmail().withMessage("invalid email/mail"),
    body("name").isLength(3).notEmpty().withMessage("name is required"),
    
    (req, res, next) => {
        const error = validationResult(req);
        console.log(error.isEmpty());
        if (!error.isEmpty()) {
            return res.status(400).json({ message: "validation error", validationErrors: error.errors });
       }
        next();
    }
];
module.exports = { emailValidation };