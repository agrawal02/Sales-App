const express = require("express");
const app = express();
const PORT = 3200;
const cors = require("cors")
const bodyParser = require("body-parser")
const mongo = require("mongoose")
const { MONGO_URL } = require("./config");
const path = require('path');


app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

//making connection to MongoDB Database
mongo.set('strictQuery', false)
mongo.connect(MONGO_URL)
mongo.connection.on("connected",()=>{
    if("connected"){
        console.log("DB Connected")
    }else{
        console.log("not Connected");
    }
})
app.use(express.static(path.join(__dirname, 'client','build')))
app.get('*', async(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build','index.html'))
})

//user_model for creating schema in Database
require("./models/user_model")
require("./models/sales_model")

//user_route for prforming APIs requests 
app.use(require("./routes/user_route"))
app.use(require("./routes/sales_route"))

//For testing perpose
app.get("/", (req, res) => {
    console.log({ "msg": "Hellow World" })
    res.send();
});

app.listen(PORT, () => {
    console.log("server started at", 3200)
});