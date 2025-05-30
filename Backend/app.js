const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json()); 

require("./conn/conn");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const orderRoutes = require("./routes/orders");
const messageRoutes = require("./routes/messages");



app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server started at port ${PORT}`);
});

