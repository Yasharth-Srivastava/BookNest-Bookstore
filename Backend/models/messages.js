const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            default : []
        },
        name : {
                type: String
        },
        email : {
            type: String
        },
        address: {
            type: String
        },
        message : {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Messages = mongoose.model("Messages", messageSchema)
module.exports = Messages