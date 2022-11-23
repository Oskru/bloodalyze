require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Auth
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Launch server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
