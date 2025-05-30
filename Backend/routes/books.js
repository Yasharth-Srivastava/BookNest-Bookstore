const express = require("express");
const router = express.Router();
const Book = require("../models/books")

router.post("/add-books", async (req , res) => {
    try{

        const {bookName, bookPrice, bookDescription, bookURL, bookAuthor} = req.body;

        const newBook = new Book(
            {
                bookName,
                bookPrice,
                bookDescription,
                bookURL,
                bookAuthor
            }
        );

        const saveBook = await newBook.save();
        console.log("Book Saved");
        res.status(201).json({ message: "Book registered successfully", user: saveBook });

    }catch(error){
        console.log("Failed to create books");
        res.status(500).json({ message: "Error creating book" });
    }
})

router.get("/", async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        res.status(200).json(books);
    }catch(error){
        console.log("Failed to add books");
        res.status(500).json({ message: "Error adding book" });
    }
})

router.get("/all-books", async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(error){
        console.log("Failed to add books");
        res.status(500).json({ message: "Error adding book" });
    }
})

router.get("/:bookName", async (req, res) => {
    try{
        const {bookName} = req.params;
        const bookDetail = await Book.findOne({bookName: bookName});
        res.status(200).json(bookDetail);
    }catch(error){
        console.log("Failed to fetch details");
        res.status(500).json({message:"Error Fetching Details"});
    }
})
module.exports = router;