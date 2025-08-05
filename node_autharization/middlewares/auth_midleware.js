const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const {userModel}=require("../models/usersModel.js")

const checkAuth = async(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("no token presents");

    } else {
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token);
        try{
        const decode = jwt.verify(token, process.env.jwt_secret_key)
            const user = await userModel.findOne({
                userName: decode.userName,
                
            }).select(["_id", "role"]);
            if (user) {
                console.log("before :", req.userId);
                req.userId = user;
                console.log("after :", req.userId);
                next();
            } else {
                res.status(404).json({ message: "no user found" });
        }



        } catch (error) {
            console.log(error.message);
        if (error.message === "jwt expired" || error.message === "invalid token") {
            return res .status(401).json({message:"invalid token or token expired"})
        } else {
            return res.status(400).json({message :"something went wrong"})
        }
        
       }
    }   
    
}

const authorization = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        // console.log(req.userId);
    
        if (req.userId.role) {
            const userRole = req.userId.role
            if (roles.includes(userRole)) {
                next();
            } else {
                return res.status(403).json({message:"invalid access"})
            }
  }else {
        return res.status(403).json({message:"invalid access"})
        }

    }
 };

module.exports = { checkAuth , authorization};