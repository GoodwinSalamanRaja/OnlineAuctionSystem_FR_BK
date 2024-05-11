const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors({origin:"*"}))

app.use(express.json())
app.use("/user",require("./router/UserRegister"))
app.use("/product",require("./controller/Product").uploader,require("./router/Product"))
app.use("/bidding",require("./router/Bidding"))
app.use("/public",express.static(__dirname + "/public/uploads"))
const mongoose = require("mongoose")
const MongoDb_Url = "mongodb://localhost:27017/AuctionDb"
mongoose.connect(MongoDb_Url)
    .then(() => {
        console.log(`${MongoDb_Url} connected successfully`);
    })
    .catch((error) => {
        console.log(`Some errors occurs while connecting ${error}`);
    })

const port = process.env.PORT || 8080
app.listen(port,(error) => {
    if(!error){
        console.log(`${port} server started successfully`);
    }
    else{
        console.log(error);
    }
})