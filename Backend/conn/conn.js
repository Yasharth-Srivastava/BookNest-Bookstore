const mongoose = require("mongoose");

const conn = async () => {
    try{
        await mongoose.connect(`${process.env.URI}`)
        console.log("Database Connected Successfully");
    }catch(error){
        console.error(error);
    }
}
conn();