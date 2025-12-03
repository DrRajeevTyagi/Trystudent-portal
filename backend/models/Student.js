// Student Model - Defines the structure of student documents in MongoDB

const mongoose = require('mongoose');

// Define the schema (structure) for a student
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true  // Removes whitespace
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now  // Automatically set to current date
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Create the model from the schema
const Student = mongoose.model('Student', studentSchema);

// Export the model so we can use it in other files
module.exports = Student;

