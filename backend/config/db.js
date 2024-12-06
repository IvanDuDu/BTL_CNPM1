import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect('mongodb://localhost:27017', {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log("Database connected")
    }
    catch(err){
        console.error(err);
    }
}

export default connectDB;