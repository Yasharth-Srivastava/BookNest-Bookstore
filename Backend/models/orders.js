const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user:
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                default : []
            },
            username : {
                type: String
            },
            email : {
                type: String
            },
            address: {
                type: String
            }
        },
        
        items : [
            {
                bookId : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Book',
                    default : []
                },
                bookName : {
                    type: String
                },
                bookAuthor : {
                    type : String
                },
                bookPrice : {
                    type: Number
                },
                quantity : {
                    type: Number
                }
            }
        ],

        status : {
            type : String,
            default: "Order Placed",
        }
    },
    {
        timestamps : true
    }
)

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;