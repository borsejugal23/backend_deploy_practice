const express=require("express");
const { connection } = require("./db");
const cors=require("cors");
const { userRouter } = require("./route/user.route");
const { noteRouter } = require("./route/note.route");
require("dotenv").config()
const app=express();

app.use(cors())
app.use(express.json());


app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(`server is running at ${process.env.port}`)
    } catch (error) {
        
        console.log("error")
    }
})