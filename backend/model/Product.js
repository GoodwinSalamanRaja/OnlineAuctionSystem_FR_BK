const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const product = new Schema(
    {
        name:{type:String,required:true},
        category:{type:String,required:true},
        description:{type:String,required:true},
        regprice:{type:String,required:true},
        bidprice:{type:String,required:true},
        biddate:{type:String,required:true},
        image:{type:String,required:true},
    },{timestamps:true}
)

module.exports = mongoose.model("products",product)