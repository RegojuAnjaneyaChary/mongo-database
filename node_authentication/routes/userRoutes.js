const express = require("express");
const router = express.Router();
const {checkAuth}= require("../middlewares/auth_midleware.js")

const {
    loginController, signupController, profileController,
    editprofile
} = require("../controllers/userController.js");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/profile", checkAuth, profileController);
//protected api or authenticated api
router.put("/editprofile", checkAuth,  editprofile);

module.exports = router;