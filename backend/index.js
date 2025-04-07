dotenv.config();
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import { ChatsModel } from "./schema/db.js";
import { ProposalsModel } from "./schema/db.js";
import { z } from 'zod';

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
app.post('/chats',async(req, res) => {

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


app.get('/chats', async (req, res) => {
    const data = await ChatsModel.find({});
    console.log(data);
    res.status(200).json(data);
}
);

const proposalArray = [];
app.post('/proposals',async(req, res) => {

    // Main Logic
   let message = req.body?.message;  

   //Input Validation 

   if(!message || typeof message !== 'string'|| message.length <= 3) {
    console.log("Invalid input", message); 
    return res.status(400).json({ error: "Invalid input" });
   }

 
   console.log(message);

   const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents : message
   });
   const finalResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    
   const proposal = { message, response: finalResponse };

   proposalArray.push(proposal);

   // Save to MongoDB
   await ProposalsModel.create(proposal);

    res.status(200).json({ proposal });
});


app.get('/proposals', async (req, res) => {
    const data = await ProposalsModel.find({});
    console.log(data);
    res.status(200).json(data);
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});