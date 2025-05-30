const express = require("express");
const router = express.Router();
const Messages = require("../models/messages")
const User = require("../models/users");

router.post("/new-message", async (req, res) => {
    try {
        const {user, formData} = req.body;
        const userId  = user._id;
        const name = user.username;
        const email = user.email;
        const address = user.address;
        const { message } = formData
        const newMessage = new Messages({
            userId,
            name,
            email,
            address,
            message
        })

        const saveMessage = await newMessage.save();
        const currentUser = await User.findById(userId);
        if(currentUser){
            if(!currentUser.messages.includes(saveMessage._id)){
                currentUser.messages.push(saveMessage._id);
                await currentUser.save();
            }
        }
        res.json(`${userId} - ${saveMessage}`);
    } catch (error) {
        res.json({message: "Messgae not sent"})
    }  
})

module.exports = router;