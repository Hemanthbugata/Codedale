import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
