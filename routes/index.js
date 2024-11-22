const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB Connection
const mongodb = 'mongodb+srv://whathe7a1234:HPZ6Ys1B7Ni4eqgp@cluster0.lwkaj.mongodb.net/carDB?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Car Schema and Model
const carSchema = new mongoose.Schema({
  tenXe: { type: String, required: true },
  hangXe: { type: String, required: true },
  namSX: { type: Number, required: true },
  gia: { type: Number, required: true },
  moTa: { type: String, required: true }
});

const Car = mongoose.model('Car', carSchema);

// Routes

// GET all cars
router.get('/getCars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
});

// POST a new car
router.post('/postCars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: 'Error creating car' });
  }
});

// PUT (update) a car by ID
router.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: 'Error updating car' });
  }
});

// DELETE a car by ID
router.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting car' });
  }
});

// List collections in the database
router.get('/listCollections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections.map(col => col.name));
  } catch (err) {
    res.status(500).json({ error: 'Error listing collections' });
  }
});
router.get('/', function(req, res, next) {
  res.render('index'); // Kết nối đến file views/index.ejs
});


module.exports = router;
