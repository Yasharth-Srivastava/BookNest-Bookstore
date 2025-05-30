const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        bookName:{
            type:String
        },
        bookPrice:{
            type:Number
        },
        bookDescription:{
            type:String
        },
        bookURL:{
            type:String
        },
        bookAuthor:{
            type:String
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;