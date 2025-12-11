const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const customerRouter = require('./routes/customerRouter');
const invouceRouter = require('./routes/invoiceRouter');
const dashboardRouter = require('./routes/dashboardRouter');
require('dotenv').config();


const app = express()
const PORT = process.env.PORT || 8000
const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(corsOption));


// Routes
app.get('/', (req, res) => {
    return res.send('Server is running...........');
});

app.use("/user", authRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);
app.use("/invoice", invouceRouter);
app.use("/", dashboardRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`connected : http://localhost:${PORT}`);
})