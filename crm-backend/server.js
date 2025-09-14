require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');
const oppRoutes = require('./routes/opportunities');

const app = express();
const PORT = process.env.PORT || 5000;

// connect db
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/opportunities', oppRoutes);

// simple root
app.get('/', (req, res) => res.json({ msg: 'CRM Backend running' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
