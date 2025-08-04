const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.mongoose_uri, {
            dbName: process.env.mongoose_dbName,
        });
        console.log(
            "mongodb database connected successfully with " + process.env.mongoose_dbName
        );   
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;