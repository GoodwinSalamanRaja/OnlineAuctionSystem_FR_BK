const mongoose = require("mongoose")
const bidding = mongoose.model(
    "bidding",
    new mongoose.Schema(
        {
            productName:{type:String,required:true},
            amount:{type:Number,required:true}
        },
        {timestamps:true}
    )
)

module.exports = bidding