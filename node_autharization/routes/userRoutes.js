const express = require("express");
const router = express.Router();
const {checkAuth, authorization}= require("../middlewares/auth_midleware.js")

const {
    loginController, signupController, profileController,
    editprofile, getAllUsers
} = require("../controllers/userController.js");

router.post("/signup", signupController);
router.post("/login", loginController);

//only for users
router.get("/profile", checkAuth, authorization("user"), profileController);



//protected api or authenticated api
router.put("/editprofile", checkAuth, editprofile);

//only for admin can access
router.get("/getallUsers", checkAuth, authorization("admin", "managers"), getAllUsers)

module.exports = router;