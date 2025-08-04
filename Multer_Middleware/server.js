const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const ImageModel = require("./Models/imageModel.js")
const bcrypt = require("bcryptjs");

function connectDb() {
    mongoose.connect("mongodb://localhost:27017/", { dbName: "demo_multer" })
        .then(() => {
            console.log("DB connected successfully")
        }).catch((err) => console.log(err));
}
connectDb();

//hashing & salting
const str = "hello@123";
// console.log(bcrypt.hashSync(str, 6))

const hashpassword = "$2b$06$rKgSeG8LGG/8xplBLVXmROx/Iz.FbPKgZ/MkLuCGteGkVOXwVRpMW"
console.log(bcrypt.compareSync(str, hashpassword))
//COMPARE plain password === hashpassword (plain password means str, it is changed in internal convert in salting)

//middleware
// app.use(express.static("public"));
app.use("/images", express.static("images"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");

    },
    filename: function (req, file, cb) {
        console.log(Date.now());
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage })
// app.use(express.json());
// app.use(express.urlencoded());


app.get("/", (req, res) => {
    res.send("hello this is server")

});
app.post("/imageupload", upload.single("image"), async (req, res) => {
    // console.log(req.headers);
    // console.log(req.file);
    // console.log(req.body);
    try {
        console.log(req.file);
        const { imageName } = req.body;

        const imageAdd = await new ImageModel({
            imageName: imageName,
            imagePath: req.file.path
        });
        imageAdd.save();

        res.json(imageAdd)


    } catch (error) {
        res.json(error)

    }
    res.send("image upload")

});

app.get("/getimages", async (req, res) => {
    try {
        const data = await ImageModel.find();
        const results = data.map((val) => {
            return { ...val, url: "http://localhost:3000/" + val.imagePath.replace("\\", "/") };
        });
        res.json(results);


    } catch (error) {
        res.json(error)

    }

});

app.listen(3000, () => {
    console.log("server started in 3000 port")
})