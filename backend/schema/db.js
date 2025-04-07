import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;

const Chats = new Schema({
    message : String,
});
export const ChatsModel = mongoose.model("chats", Chats);

const Proposals = new Schema({
    message: String,
    response: String, 
  });
  
  export const ProposalsModel = mongoose.model("proposals", Proposals);
  