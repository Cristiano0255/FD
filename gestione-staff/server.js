const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Dispatcher = require('./models/Dispatcher');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connesso'))
  .catch(err => console.error(err));

// Rotte per i dispatcher
app.get('/api/dispatchers', async (req, res) => {
  const dispatchers = await Dispatcher.find();
  res.json(dispatchers);
});

app.post('/api/dispatchers', async (req, res) => {
  const newDispatcher = new Dispatcher(req.body);
  await newDispatcher.save();
  res.json(newDispatcher);
});

app.put('/api/dispatchers/:id', async (req, res) => {
  const updatedDispatcher = await Dispatcher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedDispatcher);
});

app.delete('/api/dispatchers/:id', async (req, res) => {
  await Dispatcher.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});