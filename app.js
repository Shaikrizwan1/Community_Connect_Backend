const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Unhandled Promise Rejection Handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Consider exiting the process
    process.exit(1);
});

// Uncaught Exception Handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
    // Consider exiting the process
    process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

module.exports = app;
