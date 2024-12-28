const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // enable CORS

// Define a simple schema and model for items
const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Document = mongoose.model('Document', documentSchema);

// Simple test route to insert a document
app.get('/create-sample', async (req, res) => {
  try {
    const newDocument = new Document({ title: 'Sample Document', content: 'This is a sample document content' });
    await newDocument.save();
    res.send('Sample document created');
  } catch (err) {
    res.status(500).send('Error creating document');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));