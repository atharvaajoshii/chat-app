import mongoose from "mongoose";
 
const connecttomongodb = async ()=>{
    try{
        await mongoose.connect(process.env.mongo_db_url)
        console.log("connteted to mongo db")
    }catch(err){
        console.log("erroro conntecting"+err)
    }
}

export default connecttomongodb;