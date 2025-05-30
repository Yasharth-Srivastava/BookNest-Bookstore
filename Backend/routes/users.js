const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../models/users");

router.post("/register", async (req , res) => {
    try{
        const {username, email, password, address} = req.body;

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            address
        });

        const saveUser = await newUser.save();
        console.log("User Saved");
        return res.status(201).json({ message: "User registered successfully", user: saveUser });
    }
    catch(error){
        console.log("Failed to create user");
        return res.status(500).json({ message: "Error creating user" });
    }
})

router.post('/login', async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const findUser = await User.findOne({ email:userEmail });

    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(userPassword, findUser.password);

     if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials (Incorrect password)" });
    }

    return res.status(200).json({
      message: "Login successful",
      user:findUser
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/add-to-favorite', async (req, res) => {
  try {
    const {userId, bookId} = req.body;
    const user = await User.findById(userId);
    if(user){
      if(!user.favorite.includes(bookId)){
        user.favorite.push(bookId)
        await user.save();
      }
    }
    res.json({message: "Book added to favrite"})
  } catch (error) {
    res.json({message : "Can not add to favorite"});
  }
})

router.post("/remove-from-favorite", async (req, res) => {

  try {
    const {userId, bookId} = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {$pull : {favorite : bookId}},
      {new : true}
    )
    res.json(user);
  } catch (error) {
    res.json({message:"Backend Problem"})
  }
  
})

router.get("/fetch-favorite/:userId", async (req,res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId).populate("favorite");
    console.log("Done")
    res.json(user);
  } catch (error) {
    res.json({message:"Error Fetching Books"})
    console.log("Error During Book Fetching")
  }
})

router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);
    if(user){
      if(!user.cart.includes(bookId)){
        user.cart.push(bookId);
        await user.save();
      }
    }
    res.json({message:"Book added to cart"})
  } catch (error) { 
    console.log(error);
    res.json({message:"Backend Problem in adding to cart"})
  }
})

router.post("/remove-from-cart", async (req, res) => {
  try {
    const {userId, bookId} = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {$pull : {cart : bookId}},
      {new : true}
    )
    res.json(user);
  } catch (error) {
    res.json({message:"Can't remove it"})
  }
})

router.get("/fetch-cart-details/:userId", async (req, res) => {

  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cart");
    console.log("Done");
    res.json(user);
  } catch (error) {
    res.json({message:"Can't Fetch Cart in Backend"});
  }
  
})

module.exports = router;