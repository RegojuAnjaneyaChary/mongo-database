const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        uppercase: true,
        minlength: 2
    },
    body: {
        type: String,
        require: true,
        trim: true,
        minlength: 2
    },
}, { timestamps: true });

const TodosModel = mongoose.model("todos", todoSchema)

module.exports = { TodosModel };