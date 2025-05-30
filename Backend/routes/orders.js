const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const User = require("../models/users");


router.post("/place-order", async (req, res) => {
    try {
        const { user, items, status} = req.body;
        const order = new Orders ({
            user,
            items,
            status
        })
        const saveOrder = await order.save();
        const currentOrder = saveOrder._id;
        const currentUser = await User.findById(user.userId);

        if(currentUser){
            if(!currentUser.orders.includes(currentOrder)){
                currentUser.orders.push(currentOrder);
                await currentUser.save();
            }
        }
        await User.findByIdAndUpdate(
            user.userId,
            {$set : {cart : []}}
        )
        res.json(saveOrder)
    } catch (error) {
        res.json({message: "Can't Place the order"})
    }
})


router.get("/fetch-order-history/:userId", async (req, res) => {
    try {
        const {userId} = req.params;
        const currentUser = await User.findById(userId).populate("orders")
        res.json(currentUser.orders)
    } catch (error) {
        res.json({message: "Can't Fetch Order History"})
    }
})

module.exports = router;