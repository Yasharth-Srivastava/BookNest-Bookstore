const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        favorite:[
                {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Book',
                    default: [] 
                }
        ],
        cart:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                default: []
            }
        ],
        orders: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Orders",
                default: []
            }
        ],
        messages : [
           { 
                type:mongoose.Schema.Types.ObjectId,
                ref: "Messages",
                default : []
            }
        ]
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;