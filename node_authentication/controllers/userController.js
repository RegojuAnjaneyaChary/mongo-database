const bcryptjs = require("bcryptjs");
const { userModel } = require("../models/usersModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 12);
        console.log(hashedPassword)

        const userData = new userModel({
            userName: name,
            password: hashedPassword,
            email: email,
            bio: req.body.bio || "",
        });
        const user = await userData.save();



        return res.json({ message: "user signup successflly", user:{ userName: user.userName, bio: user.bio, email: user.email }
    })  
    } catch (error) {
        console.log("error", error);
        res.json({ error_message: error.message });

    }


};


// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email: email });
//         console.log("User found:", user);

//         if (user) {
//             // ✅ Await password comparison
//             const passwordCheck = await bcryptjs.compareSync(password, user.password);
//             console.log("Password match:", passwordCheck);

//             if (passwordCheck === true) {
//                 return res.status(200).json({
//                     message: "Login successfully",
//                     userInfo: {
//                         userName: user.userName,
//                         email: user.email,
//                         bio: user.bio
//                     }
//                 });
//             } else {
//                 return res.status(400).json({ error_message: "Invalid email or password" });
//             }

//         } else {
//             console.log("User not found");
//             return res.status(400).json({ error_message: "Invalid email or password" });
//         }

//     } catch (error) {
//         console.log("Login error:", error);
//         return res.status(500).json({ error_message: error.message });
//     }
// };

//new code

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        console.log("User found:", user);

        if (user) {
            // ✅ Await password comparison
            const passwordCheck = await bcryptjs.compareSync(password, user.password);
            console.log("Password match:", passwordCheck);

            if (passwordCheck === true) {
                const token = jwt.sign({ userName: user.userName }, process.env.jwt_secret_key, { expiresIn: "12h" });


                res.status(200).json({
                    message: "Login successfully",
                    userInfo: {
                        userName: user.userName,
                        email: user.email,
                        bio: user.bio
                    },
                    accessToken: token,
                });
            } else {
                return res.status(400).json({ error_message: "Invalid email or password" });
            }

        } else {
            console.log("User not found");
            return res.status(400).json({ error_message: "Invalid email or password" });
        }

    } catch (error) {
        console.log("Login error:", error);
        return res.status(429).json({ error_message: error.message });
    }
};



const profileController = async(req, res) => {

    try {
        const userProfile = await userModel.findById(req.userId).select([
            "-password",
            "-__v",
            "-createdAt",
            "-updatedAt",

        ])
        res.json(userProfile)

        
    } catch (error) {
     
        return res.status(400).json({ message: error.message });
        
       
    }
};


const editprofile = (req, res) => {
    return res.send("this is edit profile")
}
module.exports = { signupController, loginController, profileController, editprofile }