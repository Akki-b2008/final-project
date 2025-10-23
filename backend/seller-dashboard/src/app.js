const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const sellerRoutes =require('./routes/seller.routes')

app.use(express.json());

app.use(cookieParser());

app.use('/api/sellers', sellerRoutes);

module.exports = app;