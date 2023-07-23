import express from "express";
import userRoutes from "./routes/users.js"
import taskRoutes from "./routes/tasks.js"
import {connect} from "./data/connect.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.js";
import cors from 'cors'

const app = express();

connect();
// use of env
config({
    path: "./data/config.env"
});


/// using middle ware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET","PUT", "POST", "DELETE"],
    credentials: true
}))


//using routes
app.use("/users",userRoutes);
app.use("/tasks",taskRoutes);



app.get("/",(req,res)=>{
    res.send("HII");
})


// Error Handler
app.use(errorHandler);



app.listen(process.env.PORT, ()=>{
    console.log(`Sever is running on port:${process.env.PORT} `);
})

