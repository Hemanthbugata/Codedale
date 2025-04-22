const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();    
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const productRouter = require('./routes/product'); 
const categoryRouter = require('./routes/category');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/payment');
const reviewRouter = require('./routes/review');
const searchRouter = require('./routes/search');

const app = express();

dotenv.config();

app.use(express.json());
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', paymentRouter);
app.use('/api', reviewRouter);
app.use('/api', searchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});