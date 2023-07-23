import mongoose from "mongoose";


export const connect = () =>{
    mongoose.connect(process.env.MONGO_URI, {dbName: "backendapi"})
    .then(()=>{
        console.log("backend connected")
    })
    .catch((e)=>{console.log(e)});
}
