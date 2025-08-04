const express = require("express");
const app = express();

const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/");


const connectDB = async () => {
    await client.connect();
    console.log("mongodb connected");
    db = client.db("node_db");
    console.log("node_db");
    const collection = db.collection("demo");
    console.log('collection created in database');
    await db.collection("demo").insertOne({ name: "chary", age: 20 });

}
connectDB();
app.use(express.json())

app.post("/add", async (req, res) => {
    try {
        console.log(req.body)
        await db.collection('demo').insertOne(req.body);
        res.send("info added");
    }
    catch (error) {
        console.log(error)
        res.status(400).send("unable to add info")
    }
});


app.listen(4000, () => {
    console.log("server running on port 4000")
})