

import dotenv from 'dotenv'
import connectDB from "./src/db/index.js";
import  {app} from "./src/app.js";

dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
       
            console.log(`server is running at port :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongo Db Connection Failed", err)
    })









/*
import { express } from "express";

const app = express()
    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("error", (error) => {
                console.log("Error", error);
                throw error
            })



            app.listen(process.env.PORT || 5000, () => `Server running on port  🔥`);

        } catch (error) {
            console.error("Error", error)
        }
    })()
    */