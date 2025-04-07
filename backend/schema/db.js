import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { Schema } = mongoose;

// Chat Schema
const ChatsSchema = new Schema(
  {
    message: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const ChatsModel = mongoose.model("Chat", ChatsSchema);

// Proposal Schema
const ProposalsSchema = new Schema(
  {
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProposalsModel = mongoose.model("Proposal", ProposalsSchema);
