dotenv.config();
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import { ChatsModel } from "./schema/db.js";



const app = express();
app.use(express.json());

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


async function connectDb() {
    try{
        const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected", connectDb);
    }
    catch(error) {
        console.error("connectDB error", error);
    }
}
connectDb();
const messagesArray = [];
app.post('/chat',async(req, res) => {

    // Main Logic
   let message = req.body?.message;  

   console.log(message);

   const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents : message,
   });
       
    messagesArray.push(message);

    console.log(messagesArray);


   // Save to MongoDB
   await ChatsModel.create({
    message: message
   });

   res.status(200).json({response});

});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});