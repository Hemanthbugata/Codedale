import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    admissionDate: Date,
});

export const Student = mongoose.model("Student", studentSchema);