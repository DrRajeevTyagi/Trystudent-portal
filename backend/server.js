// Student Portal Backend Server
// Now with MongoDB Database Integration!

// Step 1: Import packages
require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');  // MongoDB library
const Student = require('./models/Student');  // Student model

// Step 2: Create Express application
const app = express();

// Step 3: Define port number
const PORT = process.env.PORT || 3000;

// Step 4: Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    console.log('📊 Database ready for use!');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Step 5: Middleware (functions that run before routes)
app.use(cors({
  origin: '*',  // Allow all origins for now (we'll restrict later)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());  // Parse JSON data from requests

// Step 6: Routes (API Endpoints)

// Root route - Test if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Student Portal API!',
    status: 'Server is running successfully! 🚀'
  });
});

// Get all students (FROM DATABASE!)
app.get('/api/students', async (req, res) => {
  try {
    // Fetch all students from MongoDB
    const students = await Student.find();
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students'
    });
  }
});

// Get server info
app.get('/api/info', (req, res) => {
  res.json({
    serverName: 'Student Portal API',
    version: '1.0.0',
    developer: 'Physics Principal Learning to Code',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    dbName: mongoose.connection.name
  });
});

// POST - Add a new student (TO DATABASE!)
app.post('/api/students', async (req, res) => {
  try {
    // Create new student document
    const newStudent = new Student(req.body);
    
    // Save to database
    const savedStudent = await newStudent.save();
    
    console.log('✅ Student saved to database:', savedStudent.name);
    
    res.status(201).json({
      success: true,
      message: 'Student added successfully!',
      data: savedStudent
    });
  } catch (error) {
    console.error('❌ Error saving student:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to add student'
    });
  }
});

// POST - Test greeting endpoint
app.post('/api/greet', (req, res) => {
  const { name } = req.body;
  
  res.json({
    success: true,
    message: `Hello, ${name}! Welcome to Student Portal! 👋`,
    timestamp: new Date().toISOString()
  });
});

// Step 7: Start the server
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log('🚀 Student Portal Backend Server Started!');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🕐 Started at: ${new Date().toLocaleString()}`);
  console.log('═══════════════════════════════════════════');
});

