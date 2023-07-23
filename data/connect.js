import mongoose from "mongoose";


export const connect = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017", {dbName: "backendapi"})
    .then(()=>{
        console.log("backend connected")
    })
    .catch((e)=>{console.log(e)});
}