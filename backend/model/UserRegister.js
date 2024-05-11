const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")
const schema = mongoose.Schema
const user = new schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true},
        biddings:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"bidding"
            }
        ]
    },{timestamps:true}
)

module.exports = mongoose.model("user",user)