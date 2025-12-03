// Seed Database - Add initial student data
// Run this once to populate your database with sample students

require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

// Sample students
const sampleStudents = [
  {
    name: 'Alice Johnson',
    grade: 'A',
    class: '10th',
    email: 'alice@school.com'
  },
  {
    name: 'Bob Smith',
    grade: 'B+',
    class: '10th',
    email: 'bob@school.com'
  },
  {
    name: 'Charlie Brown',
    grade: 'A-',
    class: '10th',
    email: 'charlie@school.com'
  },
  {
    name: 'Diana Prince',
    grade: 'A+',
    class: '11th',
    email: 'diana@school.com'
  },
  {
    name: 'Ethan Hunt',
    grade: 'B',
    class: '11th',
    email: 'ethan@school.com'
  }
];

// Connect and seed
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing students (optional - comment out to keep existing data)
    await Student.deleteMany({});
    console.log('🗑️  Cleared existing students');

    // Insert sample students
    const result = await Student.insertMany(sampleStudents);
    console.log(`✅ Added ${result.length} students to database!`);
    
    // Display added students
    result.forEach((student, index) => {
      console.log(`  ${index + 1}. ${student.name} - Grade: ${student.grade}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeded successfully!');
    console.log('👉 Now check your frontend at http://localhost:5173/');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit();
  }
}

// Run the seeding
seedDatabase();

